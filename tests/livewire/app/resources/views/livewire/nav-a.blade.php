<div class="harness" id="page-a">
    <h1>Page A</h1>
    <button type="button" id="lw-bump" wire:click="$set('tick', {{ $tick + 1 }})">bump {{ $tick }}</button>
    @include('examples.command')
    @include('examples.toast')
    @include('examples.theme-toggle')
    @include('examples.scroll-progress')
    @include('examples.tooltip')
    @include('examples.text-highlighter')
</div>
