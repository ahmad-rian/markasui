<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.app')]
class Islands extends Component
{
    public int $tick = 0;

    public function bump(): void
    {
        $this->tick++;
    }

    public function render()
    {
        return view('livewire.islands');
    }
}
