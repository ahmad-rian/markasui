<form class="grid gap-5 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Check your email</p>
        <p class="text-sm text-muted">We sent a 6-digit code to ana@example.com. It expires in 10 minutes.</p>
    </div>
    <x-markas.input-otp name="code" label="Verification code" />
    <x-markas.button type="submit" class="w-full">Verify email</x-markas.button>
    <p class="text-sm text-muted">Did not get a code? <a href="#" class="font-medium text-primary underline underline-offset-2">Send again</a></p>
</form>
