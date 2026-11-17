<?php

use App\Livewire\Forms;
use App\Livewire\Harness;
use App\Livewire\Islands;
use App\Livewire\NavA;
use App\Livewire\NavB;
use App\Livewire\Perf;
use App\Livewire\PerfTyping;
use Illuminate\Support\Facades\Route;

// Livewire 4 registers full page components with Route::livewire(), Livewire 3 with Route::get().
$page = fn (string $uri, string $component) => Route::hasMacro('livewire')
    ? Route::livewire($uri, $component)
    : Route::get($uri, $component);

Route::get('/', fn () => 'ok');
$page('/c/{name}', Harness::class);
$page('/forms', Forms::class);
$page('/nav/a', NavA::class);
$page('/nav/b', NavB::class);

// Islands only exist in Livewire 4.
if (Route::hasMacro('livewire')) {
    $page('/islands', Islands::class);
}

// Perf audit pages.
$page('/perf/{name}', Perf::class);
$page('/perf-typing', PerfTyping::class);
