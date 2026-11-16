<?php

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Component;
use Livewire\WithFileUploads;

#[Layout('layouts.app')]
class Forms extends Component
{
    use WithFileUploads;

    public string $text = '';

    public string $blurred = '';

    public string $bio = '';

    public string $city = 'bandung';

    public bool $agree = false;

    public array $tags = [];

    public bool $notify = false;

    public string $plan = 'pro';

    public int $volume = 30;

    public string $country = '';

    public $amount = 50000;

    public string $code = '';

    public $view = 'week';

    public array $styles = [];

    public bool $bold = false;

    public $upload = null;

    public array $uploads = [];

    public int $renders = 0;

    public bool $showModal = false;

    public bool $showDrawer = false;

    public bool $confirmOpen = false;

    public string $picked = '';

    public string $confirmed = '';

    public function pick(string $value): void
    {
        $this->picked = $value;
    }

    public function confirm(): void
    {
        $this->confirmed = 'yes';
    }

    public function toast(): void
    {
        $this->dispatch('markas-toast', title: 'Saved from server', variant: 'success');
    }

    public function openModal(): void
    {
        $this->showModal = true;
    }

    public function setFromServer(): void
    {
        $this->text = 'server';
        $this->city = 'surabaya';
        $this->agree = true;
        $this->notify = true;
        $this->plan = 'business';
        $this->volume = 80;
        $this->country = 'jp';
        $this->amount = 250000;
        $this->code = '123456';
        $this->view = 'month';
        $this->styles = ['italic'];
        $this->bold = true;
        $this->tags = ['vue'];
    }

    public function state(): array
    {
        return ['text' => $this->text, 'blurred' => $this->blurred, 'bio' => $this->bio, 'city' => $this->city, 'agree' => $this->agree, 'tags' => $this->tags, 'notify' => $this->notify, 'plan' => $this->plan, 'volume' => $this->volume, 'country' => $this->country, 'amount' => $this->amount, 'code' => $this->code, 'view' => $this->view, 'styles' => $this->styles, 'bold' => $this->bold, 'upload' => $this->upload?->getClientOriginalName(), 'uploads' => collect($this->uploads)->map(fn ($f) => $f->getClientOriginalName())->all(), 'renders' => $this->renders, 'showModal' => $this->showModal, 'showDrawer' => $this->showDrawer, 'confirmOpen' => $this->confirmOpen, 'picked' => $this->picked, 'confirmed' => $this->confirmed];
    }

    public function render()
    {
        $this->renders++;

        return view('livewire.forms');
    }
}
