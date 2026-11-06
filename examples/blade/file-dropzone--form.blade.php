@php
    $form = 'grid gap-4';
    $field = 'grid gap-1.5';
    $label = 'text-sm font-medium text-ink';
    $footer = 'flex justify-end';

    $attached = [
        ['name' => 'campaign-brief.docx', 'size' => 88064, 'type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ];
@endphp

<form action="#" class="{{ $form }}">
    <x-markas.input name="project" label="Project name" placeholder="Spring launch" />
    <div class="{{ $field }}">
        <p class="{{ $label }}">Attachments</p>
        <x-markas.file-dropzone
            name="attachments[]"
            accept=".pdf,.docx,.zip"
            multiple
            :max-files="5"
            :max-size="10485760"
            hint="PDF, DOCX, or ZIP, up to 10 MB each"
            :files="$attached"
        />
    </div>
    <div class="{{ $footer }}">
        <x-markas.button type="submit">Send request</x-markas.button>
    </div>
</form>
