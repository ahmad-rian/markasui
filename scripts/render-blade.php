<?php

/**
 * Render file Blade ke HTML statis tanpa aplikasi Laravel penuh.
 *
 * Pemakaian: php scripts/render-blade.php <folder-sumber> <folder-output>
 *
 * Setiap <nama>.blade.php di folder sumber dirender ke <folder-output>/<nama>.html.
 * Komponen di components/<nama>/ tersedia sebagai <x-markas.nama>, sama seperti
 * di project Laravel yang menyimpan komponen di resources/views/components/markas/.
 */

declare(strict_types=1);

require __DIR__.'/../vendor/autoload.php';

use Illuminate\Container\Container;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory as FactoryContract;
use Illuminate\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\View\Engines\CompilerEngine;
use Illuminate\View\Engines\EngineResolver;
use Illuminate\View\Engines\PhpEngine;
use Illuminate\View\Factory;
use Illuminate\View\FileViewFinder;

const ROOT = __DIR__.'/..';

function fail(string $message): never
{
    fwrite(STDERR, "render-blade: {$message}\n");
    exit(1);
}

/** Salin semua komponen Blade ke <viewsDir>/components/markas/. */
function stageComponents(Filesystem $files, string $viewsDir): void
{
    $target = $viewsDir.'/components/markas';
    $files->ensureDirectoryExists($target);

    foreach ($files->directories(ROOT.'/components') as $componentDir) {
        $metaPath = $componentDir.'/meta.json';
        if (! $files->exists($metaPath)) {
            continue;
        }

        try {
            $meta = json_decode($files->get($metaPath), true, flags: JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            fail("{$metaPath} bukan JSON valid: {$e->getMessage()}");
        }
        $name = $meta['name'] ?? null;
        $file = $meta['frameworks']['blade']['file'] ?? null;
        if (! is_string($name) || $name === '') {
            fail("{$metaPath} tidak punya name");
        }
        if (! is_string($file) || $file === '') {
            fail("{$metaPath} tidak punya frameworks.blade.file");
        }
        if (! $files->exists($componentDir.'/'.$file)) {
            fail("file Blade {$componentDir}/{$file} tidak ditemukan");
        }

        $files->copy($componentDir.'/'.$file, "{$target}/{$name}.blade.php");
    }
}

function makeFactory(Filesystem $files, array $viewPaths, string $cacheDir): Factory
{
    $container = new Container;
    Container::setInstance($container);

    // ComponentTagCompiler menebak class komponen lewat namespace aplikasi.
    $container->instance(Application::class, new class
    {
        public function getNamespace(): string
        {
            return 'App\\';
        }
    });

    $compiler = new BladeCompiler($files, $cacheDir);
    $resolver = new EngineResolver;
    $resolver->register('blade', fn () => new CompilerEngine($compiler, $files));
    $resolver->register('php', fn () => new PhpEngine($files));

    $factory = new Factory($resolver, new FileViewFinder($files, $viewPaths), new Dispatcher($container));
    $factory->setContainer($container);

    $container->instance(FactoryContract::class, $factory);
    $container->instance('view', $factory);
    $container->instance('blade.compiler', $compiler);

    return $factory;
}

[$script, $sourceDir, $outDir] = array_pad($argv, 3, null);
if ($sourceDir === null || $outDir === null) {
    fail('pemakaian: php scripts/render-blade.php <folder-sumber> <folder-output>');
}
if (! is_dir($sourceDir)) {
    fail("folder sumber {$sourceDir} tidak ada");
}

$files = new Filesystem;
$viewsDir = ROOT.'/.cache/blade/views';
$cacheDir = ROOT.'/.cache/blade/compiled';
$files->deleteDirectory(ROOT.'/.cache/blade');
$files->ensureDirectoryExists($cacheDir);
$files->ensureDirectoryExists($outDir);

stageComponents($files, $viewsDir);
$factory = makeFactory($files, [$viewsDir, realpath($sourceDir)], $cacheDir);

$sources = glob(rtrim($sourceDir, '/').'/*.blade.php') ?: [];
foreach ($sources as $source) {
    $name = basename($source, '.blade.php');
    try {
        $html = $factory->make($name)->render();
    } catch (Throwable $e) {
        fail("gagal render {$source}: {$e->getMessage()}");
    }
    $files->put(rtrim($outDir, '/')."/{$name}.html", $html);
}

fwrite(STDOUT, sprintf("render-blade: %d file dirender ke %s\n", count($sources), $outDir));
