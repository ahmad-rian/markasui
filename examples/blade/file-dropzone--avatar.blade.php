@php
    $section = 'grid gap-3';
    $title = 'text-sm font-medium text-ink';
    $text = 'text-sm text-muted';

    $current = [
        ['name' => 'rania-portrait.png', 'size' => 482304, 'type' => 'image/png', 'progress' => 100],
    ];
@endphp

<div class="{{ $section }}">
    <div>
        <p class="{{ $title }}">Profile photo</p>
        <p class="{{ $text }}">Shown on your profile and next to your comments.</p>
    </div>
    <x-markas.file-dropzone
        name="avatar"
        accept="image/png,image/jpeg"
        :max-size="2097152"
        hint="Square PNG or JPG, up to 2 MB"
        drop-label="Drop a photo here or"
        browse-label="choose one"
        :files="$current"
    />
</div>
