<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.app')]
class NavB extends Component
{
    public int $tick = 0;

    public function render()
    {
        return view('livewire.nav-b');
    }
}
