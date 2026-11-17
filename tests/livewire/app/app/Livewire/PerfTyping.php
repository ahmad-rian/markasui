<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;

/** Text fields bound with wire:model.live, for the typing part of the perf audit. */
#[Layout('layouts.perf')]
class PerfTyping extends Component
{
    public string $text = '';

    public string $debounced = '';

    public string $bio = '';

    public $amount = 0;

    public $debouncedAmount = 0;

    public string $country = '';

    public function render()
    {
        return view('livewire.perf-typing');
    }
}
