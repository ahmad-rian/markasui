@php
    use Illuminate\Support\HtmlString;
    use Illuminate\Support\Js;

    /* Palet lokal, kelas, dan animasi: identik dengan versi React dan Vue. */
    $palette = '[--tpl-sky-1:#e4eef8] [--tpl-sky-2:#a8c8ea] [--tpl-sky-3:#1e4b78] dark:[--tpl-sky-1:#162330] dark:[--tpl-sky-2:#2d4f72] dark:[--tpl-sky-3:#a8c8ea] [--tpl-rose-1:#fbe7e9] [--tpl-rose-2:#f0b2ba] [--tpl-rose-3:#8c2536] dark:[--tpl-rose-1:#2b181b] dark:[--tpl-rose-2:#6d303b] dark:[--tpl-rose-3:#f0b2ba] [--tpl-sun-1:#fcf0d4] [--tpl-sun-2:#f2cb6f] [--tpl-sun-3:#7a5200] dark:[--tpl-sun-1:#2a2412] dark:[--tpl-sun-2:#6b5521] dark:[--tpl-sun-3:#f2cb6f] [--tpl-violet-1:#ece8fa] [--tpl-violet-2:#c2b5f0] [--tpl-violet-3:#47388a] dark:[--tpl-violet-1:#1e1a2d] dark:[--tpl-violet-2:#4b3f7a] dark:[--tpl-violet-3:#c2b5f0] [--tpl-coral-1:#fce8df] [--tpl-coral-2:#f3b199] [--tpl-coral-3:#8e3314] dark:[--tpl-coral-1:#2c1b15] dark:[--tpl-coral-2:#703624] dark:[--tpl-coral-3:#f3b199] [--tpl-cone-1:#fdeedb] [--tpl-cone-2:#f6a65a] [--tpl-cone-3:#7f4004] dark:[--tpl-cone-1:#2b2013] dark:[--tpl-cone-2:#b0631d] dark:[--tpl-cone-3:#f6a65a] [--tpl-teal-1:#def2ee] [--tpl-teal-2:#9dd6cc] [--tpl-teal-3:#17554d] dark:[--tpl-teal-1:#13251f] dark:[--tpl-teal-2:#2c5c53] dark:[--tpl-teal-3:#9dd6cc]';
    $tones = ['sky' => '[--art-1:var(--tpl-sky-1)] [--art-2:var(--tpl-sky-2)] [--art-3:var(--tpl-sky-3)]', 'rose' => '[--art-1:var(--tpl-rose-1)] [--art-2:var(--tpl-rose-2)] [--art-3:var(--tpl-rose-3)]', 'sun' => '[--art-1:var(--tpl-sun-1)] [--art-2:var(--tpl-sun-2)] [--art-3:var(--tpl-sun-3)]', 'violet' => '[--art-1:var(--tpl-violet-1)] [--art-2:var(--tpl-violet-2)] [--art-3:var(--tpl-violet-3)]', 'coral' => '[--art-1:var(--tpl-coral-1)] [--art-2:var(--tpl-coral-2)] [--art-3:var(--tpl-coral-3)]', 'cone' => '[--art-1:var(--tpl-cone-1)] [--art-2:var(--tpl-cone-2)] [--art-3:var(--tpl-cone-3)]', 'teal' => '[--art-1:var(--tpl-teal-1)] [--art-2:var(--tpl-teal-2)] [--art-3:var(--tpl-teal-3)]'];
    $keyframes = '@keyframes rambu-float{to{transform:translateY(-8px)}}@keyframes rambu-sway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}@keyframes rambu-blink{50%{opacity:.3}}';
    $root = 'flex min-h-dvh flex-col bg-canvas text-ink bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[24px_24px]';
    $header = 'mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 pt-5 lg:px-8';
    $brand = 'flex items-center gap-2.5 text-base font-semibold tracking-tight';
    $brandMark = 'flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary';
    $quietLink = 'inline-flex min-h-6 items-center rounded-md text-sm font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $navWrap = 'sticky top-3 z-20 mt-4 flex justify-center px-4';
    $nav = 'flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-line bg-surface/90 p-1 shadow-overlay backdrop-blur';
    $navItem = 'inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none sm:px-3 sm:text-sm';
    $navIdle = 'text-muted hover:bg-subtle hover:text-ink';
    $navActive = 'bg-primary text-on-primary';
    $navRest = 'sr-only lg:not-sr-only';
    $main = 'mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 pt-8 pb-12 lg:grid-cols-2 lg:gap-14 lg:px-8';
    $artPanel = 'relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-(--art-1)';
    $artDots = 'absolute inset-0 bg-[radial-gradient(var(--art-2)_1.5px,transparent_1.5px)] bg-size-[22px_22px] opacity-50';
    $artSvg = 'relative size-full';
    $numeral = 'font-extrabold tracking-tight [text-anchor:middle]';
    $content = 'grid gap-6';
    $intro = 'grid justify-items-start gap-3';
    $title = 'text-3xl font-semibold tracking-tight text-balance focus:outline-none sm:text-4xl';
    $lead = 'max-w-prose text-base text-pretty text-muted';
    $actions = 'flex flex-wrap gap-3';
    $linkBase = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $linkPrimary = 'bg-primary text-on-primary hover:bg-primary-strong';
    $linkSecondary = 'border border-line bg-surface text-ink hover:bg-subtle';
    $cardRow = 'flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 sm:p-5';
    $card = 'grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5';
    $help = 'text-sm text-muted';
    $inlineLink = 'rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footer = 'mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-5 text-sm text-muted lg:px-8';
    $footerLinks = 'flex flex-wrap gap-4';
    $smallLabel = 'text-sm text-muted';
    $bigValue = 'text-lg font-semibold tracking-tight';
    $suggestionList = 'grid gap-1 sm:grid-cols-2';
    $suggestion = 'flex min-w-0 items-center gap-3 rounded-xl p-2 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $suggestionIcon = 'flex size-8 shrink-0 items-center justify-center rounded-lg bg-subtle text-muted';
    $truncate = 'block truncate';
    $details = 'group rounded-2xl border border-line bg-surface';
    $summary = 'flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden';
    $chevron = 'size-4 text-muted transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none';
    $detailsBody = 'grid gap-2 border-t border-line px-4 py-3 text-sm text-muted';
    $bullets = 'grid list-disc gap-1 pl-5';
    $avatar = 'flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary';
    $rowBetween = 'flex flex-wrap items-center justify-between gap-3';
    $countdown = 'text-3xl font-semibold tracking-tight tabular-nums';
    $refCode = 'truncate text-base font-semibold tracking-tight';
    $factList = 'grid grid-cols-2 gap-3 text-sm';
    $notifyRow = 'flex flex-col gap-3 sm:flex-row sm:items-end';
    $grow = 'min-w-0 flex-1';
    $errorText = 'text-sm text-danger';
    $statusDot = 'relative flex size-3 shrink-0';
    $ping = 'absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none';
    $dot = 'relative size-3 rounded-full';
    $srOnly = 'sr-only';
    $sway = 'origin-bottom [transform-box:fill-box] animate-[rambu-sway_3.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none';
    $tilt = 'origin-center [transform-box:fill-box] animate-[rambu-sway_4s_ease-in-out_infinite_alternate] motion-reduce:animate-none';
    $float = '[transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none';
    $blink = 'animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none';
    $later = '[animation-delay:.8s]';
    $deep = 'fill-(--art-3)';
    $mid = 'fill-(--art-2)';
    $soft = 'fill-(--art-1)';
    $line = 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3)';

    /* Bentuk ilustrasi sebagai data supaya sama persis di Blade, React, dan Vue. */
    $scenery = [['t' => 'g', 'c' => 'fill-surface [transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none', 'k' => [['t' => 'circle', 'a' => ['cx' => 80, 'cy' => 96, 'r' => 16]], ['t' => 'circle', 'a' => ['cx' => 102, 'cy' => 86, 'r' => 22]], ['t' => 'circle', 'a' => ['cx' => 124, 'cy' => 98, 'r' => 14]], ['t' => 'rect', 'a' => ['x' => 64, 'y' => 96, 'width' => 74, 'height' => 16, 'rx' => 8]]]], ['t' => 'g', 'a' => ['transform' => 'translate(290 -40)'], 'k' => [['t' => 'g', 'c' => 'fill-surface [transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none [animation-delay:.8s]', 'k' => [['t' => 'circle', 'a' => ['cx' => 80, 'cy' => 96, 'r' => 16]], ['t' => 'circle', 'a' => ['cx' => 102, 'cy' => 86, 'r' => 22]], ['t' => 'circle', 'a' => ['cx' => 124, 'cy' => 98, 'r' => 14]], ['t' => 'rect', 'a' => ['x' => 64, 'y' => 96, 'width' => 74, 'height' => 16, 'rx' => 8]]]]]], ['t' => 'path', 'c' => 'fill-none stroke-(--art-2) stroke-[4] [stroke-linecap:round] [stroke-dasharray:18_16]', 'a' => ['d' => 'M36 340H444']]];
    $art = [
        '403' => [['t' => 'g', 'c' => '[transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none', 'k' => [['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[14]', 'a' => ['d' => 'M208 170v-22a32 32 0 0 1 64 0v22']], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 188, 'y' => 162, 'width' => 104, 'height' => 88, 'rx' => 18]], ['t' => 'circle', 'c' => 'fill-(--art-1)', 'a' => ['cx' => 240, 'cy' => 198, 'r' => 11]], ['t' => 'rect', 'c' => 'fill-(--art-1)', 'a' => ['x' => 235, 'y' => 202, 'width' => 10, 'height' => 26, 'rx' => 4]]]], ['t' => 'path', 'a' => ['d' => 'M344 94l4 12 12 4-12 4-4 12-4-12-12-4 12-4z'], 'c' => 'fill-primary animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none'], ['t' => 'path', 'a' => ['d' => 'M136 150l2.5 7.5 7.5 2.5-7.5 2.5-2.5 7.5-2.5-7.5-7.5-2.5 7.5-2.5z'], 'c' => 'fill-primary animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none [animation-delay:.8s]']],
        '404' => [['t' => 'g', 'c' => 'origin-bottom [transform-box:fill-box] animate-[rambu-sway_3.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none', 'k' => [['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 234, 'y' => 178, 'width' => 12, 'height' => 140, 'rx' => 3]], ['t' => 'circle', 'c' => 'fill-(--art-3)', 'a' => ['cx' => 240, 'cy' => 178, 'r' => 64]], ['t' => 'circle', 'c' => 'fill-none stroke-surface stroke-[4]', 'a' => ['cx' => 240, 'cy' => 178, 'r' => 55]], ['t' => 'path', 'c' => 'fill-none stroke-surface stroke-[10] [stroke-linecap:round] [stroke-linejoin:round]', 'a' => ['d' => 'M258 204v-30a18 18 0 0 0-36 0v6M210 168l12 14 12-14']]]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 417, 'y' => 256, 'width' => 6, 'height' => 62, 'rx' => 2]], ['t' => 'path', 'c' => 'fill-(--art-2) stroke-(--art-3) stroke-[4] [stroke-linejoin:round]', 'a' => ['d' => 'M420 200l28 28-28 28-28-28z']], ['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[6]', 'a' => ['d' => 'M420 216v14M420 240v1']]],
        '419' => [['t' => 'g', 'c' => 'origin-center [transform-box:fill-box] animate-[rambu-sway_4s_ease-in-out_infinite_alternate] motion-reduce:animate-none', 'k' => [['t' => 'path', 'c' => 'fill-surface stroke-(--art-3) stroke-[4] [stroke-linejoin:round]', 'a' => ['d' => 'M212 120h56c0 34-20 46-20 74s20 40 20 74h-56c0-34 20-46 20-74s-20-40-20-74z']], ['t' => 'path', 'c' => 'fill-(--art-2)', 'a' => ['d' => 'M222 134h36c-2 18-12 28-18 36-6-8-16-18-18-36z']], ['t' => 'path', 'c' => 'fill-(--art-2)', 'a' => ['d' => 'M220 262c4-20 12-28 20-30 8 2 16 10 20 30z']], ['t' => 'rect', 'c' => 'fill-(--art-2) animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none', 'a' => ['x' => 238, 'y' => 170, 'width' => 4, 'height' => 62, 'rx' => 2]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 200, 'y' => 108, 'width' => 80, 'height' => 12, 'rx' => 6]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 200, 'y' => 268, 'width' => 80, 'height' => 12, 'rx' => 6]]]], ['t' => 'path', 'a' => ['d' => 'M352 90l3.5 10.5 10.5 3.5-10.5 3.5-3.5 10.5-3.5-10.5-10.5-3.5 10.5-3.5z'], 'c' => 'fill-primary animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none']],
        '429' => [['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 234, 'y' => 270, 'width' => 12, 'height' => 48, 'rx' => 3]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 194, 'y' => 92, 'width' => 92, 'height' => 182, 'rx' => 24]], ['t' => 'circle', 'c' => 'fill-danger animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none', 'a' => ['cx' => 240, 'cy' => 136, 'r' => 20]], ['t' => 'circle', 'c' => 'fill-(--art-2) opacity-40', 'a' => ['cx' => 240, 'cy' => 184, 'r' => 20]], ['t' => 'circle', 'c' => 'fill-(--art-2) opacity-40', 'a' => ['cx' => 240, 'cy' => 232, 'r' => 20]], ['t' => 'path', 'c' => 'fill-none stroke-(--art-2) stroke-[6] [stroke-linecap:round]', 'a' => ['d' => 'M70 268h44M54 290h60']]],
        '500' => [['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[8]', 'a' => ['d' => 'M24 304c64 0 88-34 150-34M316 270c60 0 84 34 140 34']], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 172, 'y' => 254, 'width' => 40, 'height' => 32, 'rx' => 8]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 212, 'y' => 261, 'width' => 18, 'height' => 6, 'rx' => 3]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 212, 'y' => 273, 'width' => 18, 'height' => 6, 'rx' => 3]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 272, 'y' => 252, 'width' => 44, 'height' => 36, 'rx' => 10]], ['t' => 'rect', 'c' => 'fill-(--art-1)', 'a' => ['x' => 280, 'y' => 262, 'width' => 8, 'height' => 6, 'rx' => 2]], ['t' => 'rect', 'c' => 'fill-(--art-1)', 'a' => ['x' => 280, 'y' => 274, 'width' => 8, 'height' => 6, 'rx' => 2]], ['t' => 'path', 'c' => 'fill-none stroke-warning stroke-[4] [stroke-linecap:round] [stroke-linejoin:round] animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none', 'a' => ['d' => 'M252 240l-7 12h10l-7 12']], ['t' => 'path', 'c' => 'fill-none stroke-warning stroke-[4] [stroke-linecap:round] animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none [animation-delay:.8s]', 'a' => ['d' => 'M256 300l5-9M240 298l-6-8']]],
        '503' => [['t' => 'g', 'c' => '[transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none', 'k' => [['t' => 'path', 'c' => 'fill-(--art-2) stroke-(--art-3) stroke-[4] [stroke-linejoin:round]', 'a' => ['d' => 'M240 106l48 154h-96z']], ['t' => 'path', 'c' => 'fill-surface', 'a' => ['d' => 'M226 154h28l7 24h-42z']], ['t' => 'path', 'c' => 'fill-surface', 'a' => ['d' => 'M213 196h54l7 24h-68z']], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 178, 'y' => 258, 'width' => 124, 'height' => 14, 'rx' => 5]]]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 64, 'y' => 282, 'width' => 8, 'height' => 36, 'rx' => 2]], ['t' => 'rect', 'c' => 'fill-(--art-3)', 'a' => ['x' => 152, 'y' => 282, 'width' => 8, 'height' => 36, 'rx' => 2]], ['t' => 'rect', 'c' => 'fill-(--art-2) stroke-(--art-3) stroke-[3]', 'a' => ['x' => 52, 'y' => 262, 'width' => 120, 'height' => 22, 'rx' => 4]], ['t' => 'path', 'c' => 'fill-none stroke-surface stroke-[8]', 'a' => ['d' => 'M80 264l-12 18M108 264l-12 18M136 264l-12 18M164 264l-12 18']]],
        'offline' => [['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[14] animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none [animation-delay:.8s]', 'a' => ['d' => 'M172 132a96 96 0 0 1 136 0']], ['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[14] animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none', 'a' => ['d' => 'M195 155a64 64 0 0 1 90 0']], ['t' => 'path', 'c' => 'fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3) stroke-[14]', 'a' => ['d' => 'M217 177a32 32 0 0 1 46 0']], ['t' => 'circle', 'c' => 'fill-(--art-3)', 'a' => ['cx' => 240, 'cy' => 200, 'r' => 10]], ['t' => 'path', 'c' => 'fill-none stroke-(--art-1) stroke-[22] [stroke-linecap:round]', 'a' => ['d' => 'M184 98l112 112']], ['t' => 'path', 'c' => 'fill-none stroke-danger stroke-[10] [stroke-linecap:round]', 'a' => ['d' => 'M184 98l112 112']]],
    ];

    $pages = [
        ['id' => '404', 'short' => '404', 'rest' => ' Not Found', 'tone' => 'sky', 'badge' => 'neutral', 'numeral' => '404', 'alt' => 'A U-turn road sign standing in front of the number 404', 'title' => 'This page took a wrong turn', 'text' => 'The page you are looking for moved, was renamed, or never existed. Check the address, or search for where you meant to go.'],
        ['id' => '403', 'short' => '403', 'rest' => ' Forbidden', 'tone' => 'rose', 'badge' => 'danger', 'numeral' => '403', 'alt' => 'A closed padlock in front of the number 403', 'title' => 'This area is off limits', 'text' => 'You are signed in, but this page is only open to certain roles. Ask a workspace admin for access or switch to another account.'],
        ['id' => '419', 'short' => '419', 'rest' => ' Page Expired', 'tone' => 'sun', 'badge' => 'warning', 'numeral' => '419', 'alt' => 'An hourglass running out in front of the number 419', 'title' => 'Your session has expired', 'text' => 'For your security, forms expire after a while. Refresh the page and submit again. You may need to re-enter what you typed.'],
        ['id' => '429', 'short' => '429', 'rest' => ' Too Many Requests', 'tone' => 'violet', 'badge' => 'warning', 'numeral' => '429', 'alt' => 'A traffic light showing red in front of the number 429', 'title' => 'Slow down a little', 'text' => 'We received too many requests from your connection in a short time. Wait for the timer to finish, then try again.'],
        ['id' => '500', 'short' => '500', 'rest' => ' Server Error', 'tone' => 'coral', 'badge' => 'danger', 'numeral' => '500', 'alt' => 'An unplugged cable with sparks under the number 500', 'title' => 'Something broke on our end', 'text' => 'An unexpected error stopped this request. Our team has been alerted. Share the reference below if you contact support.'],
        ['id' => '503', 'short' => '503', 'rest' => ' Maintenance', 'tone' => 'cone', 'badge' => 'warning', 'numeral' => '503', 'alt' => 'A traffic cone and a barrier in front of the number 503', 'title' => 'We are tuning things up', 'text' => 'Rambu is down for scheduled maintenance while we upgrade the database. Everything you saved is safe.'],
        ['id' => 'offline', 'short' => 'Offline', 'rest' => '', 'tone' => 'teal', 'badge' => 'danger', 'numeral' => 'offline', 'alt' => 'A Wi-Fi signal crossed out above the word offline', 'title' => 'You are offline', 'text' => 'Check your Wi-Fi or mobile data. This page reconnects on its own as soon as the network returns.'],
    ];
    $ONLINE_COPY = ['title' => 'You are back online', 'text' => 'Your connection is working again. Pick up where you left off, or reload to get the latest data.'];
    $suggestions = [
        ['label' => 'Dashboard', 'path' => '/dashboard'],
        ['label' => 'Orders', 'path' => '/orders'],
        ['label' => 'Invoices', 'path' => '/billing/invoices'],
        ['label' => 'Customers', 'path' => '/customers'],
        ['label' => 'Team members', 'path' => '/settings/team'],
        ['label' => 'API tokens', 'path' => '/settings/api-tokens'],
    ];
    $facts = [
        ['label' => 'Time', 'value' => 'Nov 5, 2026, 09:42 WIB'],
        ['label' => 'Request', 'value' => 'POST /orders'],
    ];
    $footerNav = [
        ['label' => 'Status', 'href' => '/status'],
        ['label' => 'Help center', 'href' => '/help'],
        ['label' => 'Privacy', 'href' => '/privacy'],
    ];
    $icons = ['arrow' => 'M5 12h14M13 6l6 6-6 6', 'chevron' => 'm6 9 6 6 6-6', 'sign' => 'M12 2.5 21.5 12 12 21.5 2.5 12z'];
    $COOLDOWN = 30;
    $REFERENCE = 'RMB-500-7F3A9C';
    $MAINTENANCE_PROGRESS = 68;
    $SUPPORT = 'mailto:support@rambu.id';
    $DEFAULT_PAGE = '404';
    $TITLE_ID = 'rambu-title';
    $ids = array_column($pages, 'id');

    $cx = fn (...$classes) => implode(' ', array_filter($classes));
    $icon = fn (string $name, string $class = 'size-4') => new HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $shapes = function (array $list) use (&$shapes): string {
        $html = '';
        foreach ($list as $shape) {
            $attrs = isset($shape['c']) ? ' class="'.e($shape['c']).'"' : '';
            foreach ($shape['a'] ?? [] as $key => $value) {
                $attrs .= ' '.$key.'="'.e($value).'"';
            }
            $html .= '<'.$shape['t'].$attrs.'>'.(isset($shape['k']) ? $shapes($shape['k']) : '').'</'.$shape['t'].'>';
        }

        return $html;
    };
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    page: @js($DEFAULT_PAGE),
    online: true,
    ids: @js($ids),
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return this.ids.includes(id) ? id : @js($DEFAULT_PAGE);
    },
    go(id) {
      window.location.assign('#' + id);
    },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
  }"
  x-init="page = readHash(); online = navigator.onLine"
  x-on:hashchange.window="page = readHash(); $nextTick(() => document.getElementById(@js($TITLE_ID))?.focus())"
  x-on:online.window="online = true"
  x-on:offline.window="online = false"
>
  <style>{!! $keyframes !!}</style>
  <header class="{{ $header }}">
    <a href="/" class="{{ $brand }}">
      <span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('sign') }}</span>
      Rambu
    </a>
    <a href="/status" class="{{ $quietLink }}">System status</a>
  </header>
  <div class="{{ $navWrap }}">
    <nav aria-label="Error pages" class="{{ $nav }}">
      @foreach ($pages as $item)
        <button type="button" class="{{ $navItem }}" :class="page === @js($item['id']) ? @js($navActive) : @js($navIdle)" :aria-current="page === @js($item['id']) ? 'page' : null" x-on:click="go(@js($item['id']))">{{ $item['short'] }}@if ($item['rest'])<span class="{{ $navRest }}">{{ $item['rest'] }}</span>@endif</button>
      @endforeach
    </nav>
  </div>
  <main class="{{ $main }}">
    @foreach ($pages as $item)
      @php
        $id = $item['id'];
        $offline = $id === 'offline';
        $state = match ($id) {
            '404' => "{ query: '', suggestions: ".Js::from($suggestions).", get matches() { const needle = this.query.trim().toLowerCase(); return this.suggestions.filter((item) => (item.label + ' ' + item.path).toLowerCase().includes(needle)); }, get summary() { const count = this.matches.length; return !this.query.trim() ? 'Popular pages' : count ? count + ' ' + (count === 1 ? 'page' : 'pages') + ' found' : 'No pages match your search.'; } }",
            '403' => '{ requested: false }',
            '429' => "{ left: {$COOLDOWN}, timer: null, init() { this.timer = setInterval(() => (this.left = Math.max(0, this.left - 1)), 1000); }, destroy() { clearInterval(this.timer); } }",
            '500' => "{ report: { details: '', email: '' }, onClose(dialog) { if (dialog.returnValue === 'send') { this.notify('Report sent', 'Thanks, we logged it under {$REFERENCE}.', 'success'); this.report = { details: '', email: '' }; } dialog.returnValue = ''; } }",
            '503' => "{ email: '', error: '', submit() { const value = this.email.trim(); if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) { this.error = 'Enter a valid email address, like you@company.com.'; return; } this.error = ''; this.email = ''; this.notify('You are on the list', 'We will email ' + value + ' when Rambu is back.', 'success'); } }",
            default => '{}',
        };
        $small = $offline ? '[font-size:96px]' : '[font-size:150px]';
      @endphp
      <template x-if="page === @js($id)">
        <div class="contents" x-data="{{ $state }}">
          <div class="{{ $cx($artPanel, $tones[$item['tone']]) }}">
            <div class="{{ $artDots }}" aria-hidden="true"></div>
            <svg class="{{ $artSvg }}" viewBox="0 0 480 360" role="img" aria-label="{{ $item['alt'] }}">
              {!! $shapes($scenery) !!}
              <text x="{{ $offline ? 244 : 248 }}" y="{{ $offline ? 304 : 240 }}" class="{{ $cx($numeral, 'fill-(--art-2)', $small) }}">{{ $item['numeral'] }}</text>
              <text x="240" y="{{ $offline ? 300 : 232 }}" class="{{ $cx($numeral, 'fill-surface stroke-(--art-3) stroke-[3]', $small) }}">{{ $item['numeral'] }}</text>
              {!! $shapes($art[$id]) !!}
            </svg>
          </div>
          <div class="{{ $content }}">
            <div class="{{ $intro }}">
              @if ($offline)
                <x-markas.badge variant="success" x-show="online">Online</x-markas.badge>
                <x-markas.badge variant="danger" x-show="!online">Offline</x-markas.badge>
                <h1 id="{{ $TITLE_ID }}" tabindex="-1" class="{{ $title }}" x-text="online ? @js($ONLINE_COPY['title']) : @js($item['title'])">{{ $item['title'] }}</h1>
                <p class="{{ $lead }}" x-text="online ? @js($ONLINE_COPY['text']) : @js($item['text'])">{{ $item['text'] }}</p>
              @else
                <x-markas.badge :variant="$item['badge']">{{ $item['short'].$item['rest'] }}</x-markas.badge>
                <h1 id="{{ $TITLE_ID }}" tabindex="-1" class="{{ $title }}">{{ $item['title'] }}</h1>
                <p class="{{ $lead }}">{{ $item['text'] }}</p>
              @endif
            </div>
            @if ($id === '404')
              <div class="{{ $actions }}">
                <a href="/" class="{{ $cx($linkBase, $linkPrimary) }}">Back home</a>
                <x-markas.button variant="secondary" x-on:click="history.back()">Go back</x-markas.button>
              </div>
              <div class="{{ $card }}">
                <x-markas.input type="search" label="Search pages" placeholder="Try invoices or team" x-model="query" />
                <p class="{{ $smallLabel }}" aria-live="polite" x-text="summary">Popular pages</p>
                <template x-if="matches.length > 0">
                  <ul class="{{ $suggestionList }}">
                    <template x-for="item in matches" :key="item.path">
                      <li>
                        <a :href="item.path" class="{{ $suggestion }}">
                          <span class="{{ $suggestionIcon }}">{{ $icon('arrow') }}</span>
                          <span class="min-w-0">
                            <span class="{{ $cx($truncate, 'text-sm font-medium') }}" x-text="item.label"></span>
                            <span class="{{ $cx($truncate, 'text-xs text-muted') }}" x-text="item.path"></span>
                          </span>
                        </a>
                      </li>
                    </template>
                  </ul>
                </template>
              </div>
            @elseif ($id === '403')
              <div class="{{ $actions }}">
                <a href="/" class="{{ $cx($linkBase, $linkPrimary) }}">Back home</a>
                <x-markas.button variant="secondary" x-on:click="history.back()">Go back</x-markas.button>
              </div>
              <div class="{{ $cx($cardRow, 'flex-wrap justify-between') }}">
                <div class="flex min-w-0 items-center gap-3">
                  <span class="{{ $avatar }}" aria-hidden="true">AW</span>
                  <div class="min-w-0">
                    <p class="text-sm font-medium">Signed in as Andi Wijaya</p>
                    <p class="{{ $cx($smallLabel, 'truncate') }}">andi@rambu.id, Member role</p>
                  </div>
                </div>
                <x-markas.button variant="secondary" size="sm" x-bind:disabled="requested" x-on:click="requested = true; notify('Access requested', 'Rina Kusuma, the workspace admin, will review it.', 'success')" x-text="requested ? 'Request sent' : 'Request access'">Request access</x-markas.button>
              </div>
            @elseif ($id === '419')
              <div class="{{ $actions }}">
                <x-markas.button x-on:click="location.reload()">Refresh page</x-markas.button>
                <x-markas.button variant="secondary" x-on:click="history.back()">Go back</x-markas.button>
              </div>
              <details class="{{ $details }}">
                <summary class="{{ $summary }}">Why did this happen? {{ $icon('chevron', $chevron) }}</summary>
                <div class="{{ $detailsBody }}">
                  <p>Laravel protects every form with a CSRF token tied to your session. If the page stays open longer than the session lifetime (120 minutes here), or you signed out in another tab, the token no longer matches and the request stops with code 419.</p>
                  <ul class="{{ $bullets }}">
                    <li>Refresh the page to get a fresh token.</li>
                    <li>Copy long text before you submit it again.</li>
                    <li>Keep one tab open while you edit.</li>
                  </ul>
                </div>
              </details>
            @elseif ($id === '429')
              <div class="{{ $card }}">
                <div class="{{ $rowBetween }}">
                  <div>
                    <p class="{{ $smallLabel }}" x-text="left > 0 ? 'You can try again in' : 'Ready when you are'">You can try again in</p>
                    <p class="{{ $countdown }}" data-countdown x-text="'0:' + String(left).padStart(2, '0')">0:{{ $COOLDOWN }}</p>
                  </div>
                  <x-markas.badge variant="warning">60 requests per minute</x-markas.badge>
                </div>
                {{-- Persentase label Progress ikut diperbarui, sama seperti React dan Vue. --}}
                <div x-effect="$el.querySelector('span').textContent = Math.round(({{ $COOLDOWN }} - left) / {{ $COOLDOWN }} * 100) + '%'">
                  <x-markas.progress label="Cooldown" :value="0" :max="$COOLDOWN" x-bind:value="{{ $COOLDOWN }} - left" />
                </div>
              </div>
              <div class="{{ $actions }}">
                <x-markas.button x-bind:disabled="left > 0" x-on:click="notify('Request sent', 'You are back within the limit.', 'success')">Try again</x-markas.button>
                <a href="/" class="{{ $cx($linkBase, $linkSecondary) }}">Back home</a>
              </div>
              <p role="status" class="{{ $srOnly }}" x-text="left === 0 ? 'You can try again now.' : ''"></p>
            @elseif ($id === '500')
              <div class="{{ $actions }}">
                <x-markas.button x-on:click="location.reload()">Try again</x-markas.button>
                <x-markas.modal title="Report a problem" x-on:close="onClose($event.currentTarget)">
                  <x-slot:trigger>
                    <x-markas.button variant="secondary">Report this problem</x-markas.button>
                  </x-slot:trigger>
                  <div class="grid gap-4">
                    <p>Tell us what you were doing. We will attach reference {{ $REFERENCE }}.</p>
                    <x-markas.textarea label="What happened?" name="details" :rows="3" x-model="report.details" />
                    <x-markas.input label="Email for updates" type="email" name="email" placeholder="you@company.com" x-model="report.email" />
                  </div>
                  <x-slot:footer>
                    <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                    <x-markas.button type="submit" value="send">Send report</x-markas.button>
                  </x-slot:footer>
                </x-markas.modal>
              </div>
              <div class="{{ $card }}">
                <div class="{{ $rowBetween }}">
                  <div class="min-w-0">
                    <p class="{{ $smallLabel }}">Error reference</p>
                    <p class="{{ $refCode }}" data-reference>{{ $REFERENCE }}</p>
                  </div>
                  <x-markas.copy-button :text="$REFERENCE" variant="secondary" size="sm" copy-label="Copy reference" />
                </div>
                <dl class="{{ $factList }}">
                  @foreach ($facts as $fact)
                    <div>
                      <dt class="text-muted">{{ $fact['label'] }}</dt>
                      <dd class="font-medium">{{ $fact['value'] }}</dd>
                    </div>
                  @endforeach
                </dl>
              </div>
            @elseif ($id === '503')
              <div class="{{ $card }}">
                <div class="{{ $rowBetween }}">
                  <div>
                    <p class="{{ $smallLabel }}">Estimated completion</p>
                    <p class="{{ $bigValue }}">Today, 14:30 WIB</p>
                  </div>
                  <x-markas.badge variant="warning">About 25 minutes left</x-markas.badge>
                </div>
                <x-markas.progress label="Database upgrade" :value="$MAINTENANCE_PROGRESS" />
              </div>
              <form class="{{ $card }}" novalidate x-on:submit.prevent="submit()">
                <div class="{{ $notifyRow }}">
                  <div class="{{ $grow }}">
                    <x-markas.input label="Email me when Rambu is back" type="email" name="email" placeholder="you@company.com" x-model="email" x-bind:aria-invalid="error ? 'true' : null" x-bind:aria-describedby="error ? 'rambu-notify-error' : null" />
                  </div>
                  <x-markas.button type="submit">Notify me</x-markas.button>
                </div>
                <template x-if="error">
                  <p id="rambu-notify-error" class="{{ $errorText }}" x-text="error"></p>
                </template>
              </form>
              <div class="{{ $actions }}">
                <a href="/status" class="{{ $cx($linkBase, $linkSecondary) }}">View status page</a>
              </div>
            @else
              <div role="status" class="{{ $cardRow }}">
                <span class="{{ $statusDot }}" aria-hidden="true">
                  <span class="{{ $ping }}" :class="online ? 'bg-success' : 'bg-danger'"></span>
                  <span class="{{ $dot }}" :class="online ? 'bg-success' : 'bg-danger'"></span>
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-medium" x-text="online ? 'Connection restored' : 'No connection'"></p>
                  <p class="{{ $smallLabel }}" x-text="online ? 'Your browser reports that you are online.' : 'We will reconnect automatically when the network returns.'"></p>
                </div>
              </div>
              <div class="{{ $actions }}">
                <x-markas.button x-on:click="navigator.onLine ? notify('Connected', 'Your connection is working.', 'success') : notify('Still offline', 'Check your network and try again.', 'danger')">Try again</x-markas.button>
                <x-markas.button variant="secondary" x-on:click="history.back()">Go back</x-markas.button>
              </div>
            @endif
            <p class="{{ $help }}">Still stuck? <a href="{{ $SUPPORT }}" class="{{ $inlineLink }}">Contact support</a> or browse the <a href="/help" class="{{ $inlineLink }}">help center</a>.</p>
          </div>
        </div>
      </template>
    @endforeach
  </main>
  <footer class="{{ $footer }}">
    <p>&copy; 2026 Rambu Labs. Error pages for Laravel apps.</p>
    <nav aria-label="Footer" class="{{ $footerLinks }}">
      @foreach ($footerNav as $link)
        <a href="{{ $link['href'] }}" class="{{ $quietLink }}">{{ $link['label'] }}</a>
      @endforeach
    </nav>
  </footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
