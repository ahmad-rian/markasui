<div class="grid gap-4">
    <x-markas.textarea name="bio" label="Short bio" :rows="3" placeholder="Tell us a little about yourself" hint="Shown on your public profile." />
    <x-markas.textarea name="reason" label="Reason for refund" :rows="3" value="Wrong size" error="Please describe the issue in at least 20 characters." />
    <x-markas.textarea name="notes" label="Internal notes" :rows="3" value="Customer upgraded to the Pro plan on 3 March." disabled />
</div>
