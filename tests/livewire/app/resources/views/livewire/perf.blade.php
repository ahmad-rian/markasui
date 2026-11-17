<div class="harness">
    <div><button type="button" id="lw-bump" wire:click="bump">bump</button> <span id="lw-tick">{{ $tick }}</span> <a id="perf-go" href="/perf/{{ $name }}?n=20" wire:navigate>go</a></div>
    @php $perfStart = hrtime(true); @endphp
    <div id="lw-example">@for ($i = 0; $i < $n; $i++)<!--perf-i-->@include('examples.'.$name)@endfor<!--perf-end--></div>
    <span id="perf-ms" hidden>{{ number_format((hrtime(true) - $perfStart) / 1e6, 3, '.', '') }}</span>
</div>
