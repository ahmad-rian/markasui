<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.app')]
class Harness extends Component
{
    public string $name = '';

    public int $tick = 0;

    public function mount(string $name): void
    {
        abort_unless(preg_match('/^[a-z0-9-]+$/', $name) && view()->exists('examples.'.$name), 404);
        $this->name = $name;
    }

    public function bump(): void
    {
        $this->tick++;
    }

    public function render()
    {
        return view('livewire.harness');
    }
}
