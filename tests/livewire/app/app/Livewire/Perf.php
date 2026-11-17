<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;

/** Renders one component example $n times, for the perf audit. */
#[Layout('layouts.perf')]
class Perf extends Component
{
    private const DEFAULT_INSTANCES = 20;

    private const MAX_INSTANCES = 50;

    public string $name = '';

    public int $n = 0;

    public int $tick = 0;

    public function mount(string $name): void
    {
        abort_unless($name === 'none' || (preg_match('/^[a-z0-9-]+$/', $name) && view()->exists('examples.'.$name)), 404);
        $this->name = $name;
        $this->n = $name === 'none' ? 0 : max(0, min(request()->integer('n', self::DEFAULT_INSTANCES), self::MAX_INSTANCES));
    }

    public function bump(): void
    {
        $this->tick++;
    }

    public function render()
    {
        return view('livewire.perf');
    }
}
