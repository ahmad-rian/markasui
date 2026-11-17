@php
    use Illuminate\Support\HtmlString;

    // Data contoh dan kelas warna dibagi dengan Alpine lewat satu blok JSON.
    $data = json_decode(<<<'JSON'
    {
    "icons": {"home": "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z", "users": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", "share": "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6M8.6 13.5l6.8 4M15.4 6.5l-6.8 4", "star": "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z", "plus": "M12 5v14M5 12h14", "file": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5", "calendar": "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2", "chart": "M3 3v18h18M8 17v-5M13 17V8M18 17v-3", "send": "m22 2-7 20-4-9-9-4zM22 2 11 13", "alert": "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0", "mail": "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6", "bell": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0", "external": "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", "back": "M19 12H5M12 19l-7-7 7-7", "dots": "M5 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M17 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0", "expand": "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7", "arrow": "M7 17 17 7M7 7h10v10", "forward": "m13 17 5-5-5-5M6 17l5-5-5-5", "phone": "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92", "chat": "M7.9 20A9 9 0 1 0 4 16.1L2 22z", "user": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8", "clock": "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20", "pencil": "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z", "prev": "m15 18-6-6 6-6", "next": "m9 18 6-6-6-6", "wallet": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", "check": "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8.5 12l2.5 2.5 4.5-5", "menu": "M4 6h16M4 12h16M4 18h16", "sort": "m7 15 5 5 5-5M7 9l5-5 5 5", "globe": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20", "camera": "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8", "briefcase": "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},
    "pages": {"home": {"label": "Home", "title": "Welcome back, Dimas"}, "summaries": {"label": "Book Summaries", "title": "Book Summaries"}, "founders": {"label": "Founders", "title": "Founders Network"}, "finance": {"label": "Finance", "title": "Finance Overview"}, "contacts": {"label": "Contacts", "title": "Customer Information"}, "growth": {"label": "Growth", "title": "Growth Metrics"}, "projects": {"label": "Projects", "title": "Active Projects"}},
    "topNav": ["summaries", "founders", "finance", "contacts", "growth", "projects"],
    "rail": [{"id": "home", "label": "Home", "icon": "home"}, {"id": "contacts", "label": "Contacts", "icon": "users"}, {"id": "founders", "label": "Founders", "icon": "share"}, {"id": "summaries", "label": "Book Summaries", "icon": "star"}, {"label": "New contact", "icon": "plus"}, {"id": "finance", "label": "Finance", "icon": "file"}, {"id": "projects", "label": "Projects", "icon": "calendar"}, {"id": "growth", "label": "Growth", "icon": "chart"}, {"label": "Send update", "icon": "send"}, {"label": "Alerts", "icon": "alert"}],
    "headerStats": {"home": [{"icon": "wallet", "value": "Rp 482.500.000", "badge": "↑ 12%", "tone": "mint", "label": "Revenue booked this month"}, {"icon": "check", "value": "18", "badge": "5 due", "tone": "sky", "label": "Open tasks for this week"}, {"icon": "calendar", "value": "7", "badge": "+2 today", "tone": "mint", "label": "Meetings on your calendar"}], "summaries": [{"icon": "star", "value": "24", "badge": "+3 new", "tone": "sky", "label": "Summaries in the library"}, {"icon": "check", "value": "9", "badge": "↑ 2", "tone": "mint", "label": "Finished by the team this month"}, {"icon": "clock", "value": "13 min", "badge": "avg", "tone": "sky", "label": "Average reading time"}], "founders": [{"icon": "users", "value": "36", "badge": "+4 new", "tone": "sky", "label": "Founders in your network"}, {"icon": "wallet", "value": "Rp 86 M", "badge": "↑ 9%", "tone": "mint", "label": "Raised by portfolio this year"}, {"icon": "chat", "value": "12", "badge": "3 today", "tone": "sky", "label": "Intro requests waiting"}], "finance": [{"icon": "wallet", "value": "Rp 297.050.000", "badge": "↑ 8%", "tone": "mint", "label": "Invoiced this month"}, {"icon": "file", "value": "4", "badge": "2 overdue", "tone": "sky", "label": "Open invoices to collect"}, {"icon": "clock", "value": "18 days", "badge": "↓ 3 days", "tone": "mint", "label": "Average time to get paid"}], "contacts": [{"icon": "wallet", "value": "Rp 198.013.000", "badge": "↑ 11%", "tone": "mint", "label": "Won from 76 deals this month"}, {"icon": "users", "value": "+89", "badge": "112 new", "tone": "sky", "label": "New customers for the week"}, {"icon": "check", "value": "+31", "badge": "+6 today", "tone": "mint", "label": "New tasks for the week"}], "growth": [{"icon": "chart", "value": "1.284", "badge": "↑ 9%", "tone": "mint", "label": "New leads in 30 days"}, {"icon": "users", "value": "3,1%", "badge": "+0,2 pt", "tone": "sky", "label": "Visitor to lead conversion"}, {"icon": "wallet", "value": "Rp 91.500", "badge": "↓ 2%", "tone": "mint", "label": "Average cost per lead"}], "projects": [{"icon": "calendar", "value": "6", "badge": "2 at risk", "tone": "sky", "label": "Projects in delivery"}, {"icon": "check", "value": "142", "badge": "+18", "tone": "mint", "label": "Tasks closed this month"}, {"icon": "clock", "value": "92%", "badge": "on time", "tone": "mint", "label": "Milestones hit on schedule"}]},
    "dealList": [{"id": "d1", "day": 4, "title": "Premium Support Opportunity", "value": 11250000, "tone": "blue", "stage": "Proposal", "team": ["Budi Santoso", "Sari Wulandari", "Agus Pratama"]}, {"id": "d2", "day": 16, "title": "Enterprise Plan Most Useful", "value": 21300000, "tone": "teal", "stage": "Negotiation", "team": ["Dewi Lestari", "Fajar Nugroho", "Rina Hartati", "Yoga Prasetyo"]}, {"id": "d3", "day": 12, "title": "Strategic Partnership Success Deal", "value": 2100000, "tone": "night", "stage": "Won", "team": ["Agus Pratama", "Dewi Lestari", "Budi Santoso"]}, {"id": "d4", "day": 11, "title": "Customer Upgrade Opportunity", "value": 4160000, "tone": "sun", "stage": "Qualified", "team": ["Sari Wulandari", "Yoga Prasetyo", "Fajar Nugroho"]}, {"id": "d5", "day": 2, "title": "Onboarding Implementation", "value": 3140000, "tone": "plain", "stage": "Won", "team": ["Rina Hartati", "Budi Santoso", "Dewi Lestari", "Agus Pratama"]}, {"id": "d6", "day": 2, "title": "Renewal Deal Annual Service", "value": 12350000, "tone": "plain", "stage": "Proposal", "team": ["Fajar Nugroho", "Sari Wulandari", "Rina Hartati"]}],
    "historyMenu": [{"label": "Default order", "value": "default"}, {"label": "Highest value", "value": "high"}, {"label": "Newest first", "value": "newest"}, {"separator": true}, {"label": "Export history", "value": "export"}],
    "scheduleMenu": [{"label": "Jump to today", "value": "today"}, {"label": "Add task", "value": "add"}],
    "funnelMenu": [{"label": "Show weighted", "value": "weighted"}, {"label": "Show total", "value": "total"}, {"separator": true}, {"label": "Export funnel", "value": "export"}],
    "profileMenu": [{"label": "Copy profile link", "value": "Profile link copied"}, {"label": "Archive contact", "value": "Contact archived"}],
    "marks": {"2026-10-03": {"tone": "blue", "who": "Budi Santoso", "task": "Discovery call"}, "2026-10-08": {"tone": "blue", "who": "Sari Wulandari", "task": "Product demo"}, "2026-10-10": {"tone": "sun", "who": "Agus Pratama", "task": "Proposal review"}, "2026-10-11": {"tone": "sun", "who": "Dewi Lestari", "task": "Contract draft"}, "2026-10-14": {"tone": "teal", "who": "Fajar Nugroho", "task": "Renewal sign-off"}},
    "TODAY": "2026-10-14",
    "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "weekdays": ["M", "T", "W", "T", "F", "S", "S"],
    "funnel": {"weighted": {"total": "Rp 350.500.000", "steps": [["Qualification", "Rp 192.350.000"], ["Proposal Sent", "Rp 107.120.000"], ["Negotiation", "Rp 51.030.000"]]}, "total": {"total": "Rp 612.800.000", "steps": [["Qualification", "Rp 336.400.000"], ["Proposal Sent", "Rp 186.900.000"], ["Negotiation", "Rp 89.500.000"]]}},
    "funnelModes": ["weighted", "total"],
    "funnelWidths": ["w-full", "w-[90%]", "w-[80%]"],
    "initialContact": {"firstName": "Ratna", "lastName": "Kusuma", "email": "ratna.kusuma@nusantaradigital.id", "phone": "+62 812 4410 2231"},
    "contactFields": [{"key": "firstName", "label": "First Name", "type": "text", "icon": "user"}, {"key": "lastName", "label": "Last Name", "type": "text", "icon": "user"}, {"key": "email", "label": "Email", "type": "email", "icon": "mail", "add": "Add email"}, {"key": "phone", "label": "Phone Number", "type": "tel", "icon": "phone", "add": "Add phone number"}],
    "sources": [{"label": "Website", "icon": "globe", "tone": "bg-(--tpl-blue)"}, {"label": "Messenger", "icon": "chat", "tone": "bg-(--tpl-teal)"}, {"label": "Photo network", "icon": "camera", "tone": "bg-(--tpl-berry)"}, {"label": "Business network", "icon": "briefcase", "tone": "bg-(--tpl-night)"}],
    "profileActions": [{"label": "Send email", "icon": "mail"}, {"label": "Call", "icon": "phone"}, {"label": "Start chat", "icon": "chat"}, {"label": "Add note", "icon": "plus"}, {"label": "Schedule meeting", "icon": "calendar"}, {"label": "Share file", "icon": "file"}],
    "todayTasks": [{"id": "t1", "time": "09:00", "title": "Call Ratna about the enterprise plan"}, {"id": "t2", "time": "10:30", "title": "Send the renewal quote to PT Sinar Abadi"}, {"id": "t3", "time": "13:00", "title": "Review the onboarding checklist"}, {"id": "t4", "time": "15:00", "title": "Pipeline review with Budi"}, {"id": "t5", "time": "16:30", "title": "Follow up three new leads"}],
    "DONE_TASKS": ["t1", "t2"],
    "activity": [{"who": "Ratna Kusuma", "what": "opened the enterprise plan proposal", "when": "12 min ago"}, {"who": "Budi Santoso", "what": "logged a call with PT Sinar Abadi", "when": "40 min ago"}, {"who": "Dewi Lestari", "what": "moved Enterprise Plan to Negotiation", "when": "2 hours ago"}, {"who": "Agus Pratama", "what": "closed Strategic Partnership as won", "when": "Yesterday"}],
    "books": [{"id": "b1", "title": "The Trusted Advisor", "author": "David Maister", "topic": "Sales", "minutes": 12, "tone": "blue"}, {"id": "b2", "title": "Good Strategy Bad Strategy", "author": "Richard Rumelt", "topic": "Leadership", "minutes": 15, "tone": "teal"}, {"id": "b3", "title": "The Mom Test", "author": "Rob Fitzpatrick", "topic": "Sales", "minutes": 9, "tone": "sun"}, {"id": "b4", "title": "Radical Candor", "author": "Kim Scott", "topic": "Leadership", "minutes": 14, "tone": "night"}, {"id": "b5", "title": "The Psychology of Money", "author": "Morgan Housel", "topic": "Finance", "minutes": 11, "tone": "rose"}, {"id": "b6", "title": "Measure What Matters", "author": "John Doerr", "topic": "Leadership", "minutes": 13, "tone": "blue"}],
    "topics": ["All", "Sales", "Leadership", "Finance"],
    "READ_BOOKS": ["b2"],
    "founders": [{"name": "Andini Saraswati", "company": "Panen Kita", "sector": "Agritech", "raised": 12500000000}, {"name": "Bagas Wicaksono", "company": "Kirim Cepat", "sector": "Logistics", "raised": 31000000000}, {"name": "Citra Maharani", "company": "Sehatku", "sector": "Health", "raised": 8200000000}, {"name": "Hendra Setiawan", "company": "Dompet Usaha", "sector": "Fintech", "raised": 27400000000}, {"name": "Laras Anindita", "company": "Belajar Bareng", "sector": "Education", "raised": 4600000000}, {"name": "Reza Mahendra", "company": "Atap Hijau", "sector": "Climate", "raised": 2300000000}],
    "invoices": [{"id": "INV-2041", "customer": "PT Nusantara Digital", "due": "2026-10-08", "amount": 21300000, "status": "Overdue"}, {"id": "INV-2043", "customer": "PT Sinar Abadi", "due": "2026-10-12", "amount": 12350000, "status": "Overdue"}, {"id": "INV-2044", "customer": "CV Maju Bersama", "due": "2026-10-18", "amount": 4160000, "status": "Paid"}, {"id": "INV-2046", "customer": "PT Lintas Jawa", "due": "2026-10-24", "amount": 11250000, "status": "Pending"}, {"id": "INV-2047", "customer": "Toko Sentosa Group", "due": "2026-10-29", "amount": 3140000, "status": "Pending"}, {"id": "INV-2049", "customer": "PT Bumi Persada", "due": "2026-11-03", "amount": 2100000, "status": "Paid"}],
    "invoiceColumns": [{"key": "due", "label": "Due date", "align": "text-left"}, {"key": "amount", "label": "Amount", "align": "text-right"}],
    "statusVariant": {"Paid": "success", "Pending": "warning", "Overdue": "danger"},
    "cashflow": [["May", 212], ["Jun", 248], ["Jul", 231], ["Aug", 276], ["Sep", 264], ["Oct", 297]],
    "growthPeriods": [{"value": "7d", "label": "7 days", "bars": [38, 52, 47, 61, 58, 72, 66], "metrics": [["Visitors", "18.420"], ["New leads", "312"], ["Conversion", "3,4%"]]}, {"value": "30d", "label": "30 days", "bars": [210, 248, 236, 281, 302, 296, 331], "metrics": [["Visitors", "76.900"], ["New leads", "1.284"], ["Conversion", "3,1%"]]}, {"value": "90d", "label": "90 days", "bars": [640, 702, 688, 744, 801, 836, 902], "metrics": [["Visitors", "214.300"], ["New leads", "3.702"], ["Conversion", "2,9%"]]}],
    "barLabels": ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
    "projects": [{"id": "p1", "name": "Enterprise onboarding", "client": "PT Nusantara Digital", "status": "Active", "progress": 68, "due": "Nov 12"}, {"id": "p2", "name": "Support portal rollout", "client": "PT Sinar Abadi", "status": "At risk", "progress": 34, "due": "Oct 30"}, {"id": "p3", "name": "Partner integration", "client": "PT Lintas Jawa", "status": "Active", "progress": 52, "due": "Nov 26"}, {"id": "p4", "name": "Annual renewal audit", "client": "CV Maju Bersama", "status": "Done", "progress": 100, "due": "Oct 10"}, {"id": "p5", "name": "Data migration", "client": "PT Bumi Persada", "status": "At risk", "progress": 21, "due": "Nov 4"}, {"id": "p6", "name": "Training program", "client": "Toko Sentosa Group", "status": "Done", "progress": 100, "due": "Oct 6"}],
    "projectFilters": ["All", "Active", "At risk", "Done"],
    "projectVariant": {"Active": "primary", "At risk": "warning", "Done": "success"},
    "faceTones": ["bg-(--tpl-av1)", "bg-(--tpl-av2)", "bg-(--tpl-av3)", "bg-(--tpl-av4)", "bg-(--tpl-av5)"],
    "statBadges": {"mint": "bg-(--tpl-mint) text-(--tpl-mint-ink)", "sky": "bg-(--tpl-sky) text-(--tpl-sky-ink)"},
    "tones": {"blue": "bg-(--tpl-blue) text-(--tpl-on) [--card:var(--tpl-blue)]", "teal": "bg-(--tpl-teal) text-(--tpl-on) [--card:var(--tpl-teal)]", "night": "bg-(--tpl-night) text-(--tpl-on) [--card:var(--tpl-night)] dark:border dark:border-line", "sun": "bg-(--tpl-sun) text-(--tpl-on-sun) [--card:var(--tpl-sun)]", "plain": "border border-line bg-surface text-ink [--card:var(--color-surface)]", "rose": "bg-(--tpl-rose) text-ink [--card:var(--tpl-rose)]"},
    "dayTones": {"none": "bg-subtle/70 text-ink hover:bg-subtle", "blue": "bg-(--tpl-blue) text-(--tpl-on) [--card:var(--tpl-blue)]", "sun": "bg-(--tpl-sun) text-(--tpl-on-sun) [--card:var(--tpl-sun)]", "teal": "bg-(--tpl-teal) text-(--tpl-on) [--card:var(--tpl-teal)]"}
    }
    JSON, true);

    // Kelas Tailwind, identik dengan versi React dan Vue.
    $palette = '[--tpl-bg-a:#d9e7f7] [--tpl-bg-b:#edf5f1] [--tpl-bg-c:#f6f7f9] [--tpl-blue:#2563eb] [--tpl-teal:#0f766e] [--tpl-sun:#facc15] [--tpl-night:#131416] [--tpl-on:#ffffff] [--tpl-on-sun:#1c1a10] [--tpl-berry:#be185d] [--tpl-rose:#fbd0da] [--tpl-rose-2:#fdf2f4] [--tpl-mint:#d3f3e0] [--tpl-mint-ink:#14532d] [--tpl-sky:#dbe6fe] [--tpl-sky-ink:#1e3a8a] [--tpl-glass:#ffffffc7] [--tpl-glass-line:#ffffffd9] [--tpl-rail-idle:#a1a1aa] [--tpl-shadow:0_12px_32px_-16px_#0f172a2e] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-bg-a:#0c1522] dark:[--tpl-bg-b:#0d1714] dark:[--tpl-bg-c:#0e110e] dark:[--tpl-sun:#eab308] dark:[--tpl-night:#050607] dark:[--tpl-berry:#be185d] dark:[--tpl-rose:#3a1d28] dark:[--tpl-rose-2:#1c1619] dark:[--tpl-mint:#123626] dark:[--tpl-mint-ink:#a7f3d0] dark:[--tpl-sky:#172a4d] dark:[--tpl-sky-ink:#c7dafd] dark:[--tpl-glass:#151915c7] dark:[--tpl-glass-line:#ffffff17] dark:[--tpl-shadow:0_12px_32px_-16px_#00000080]';
    $shell = '[--tpl-bg-a:#d9e7f7] [--tpl-bg-b:#edf5f1] [--tpl-bg-c:#f6f7f9] [--tpl-blue:#2563eb] [--tpl-teal:#0f766e] [--tpl-sun:#facc15] [--tpl-night:#131416] [--tpl-on:#ffffff] [--tpl-on-sun:#1c1a10] [--tpl-berry:#be185d] [--tpl-rose:#fbd0da] [--tpl-rose-2:#fdf2f4] [--tpl-mint:#d3f3e0] [--tpl-mint-ink:#14532d] [--tpl-sky:#dbe6fe] [--tpl-sky-ink:#1e3a8a] [--tpl-glass:#ffffffc7] [--tpl-glass-line:#ffffffd9] [--tpl-rail-idle:#a1a1aa] [--tpl-shadow:0_12px_32px_-16px_#0f172a2e] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-bg-a:#0c1522] dark:[--tpl-bg-b:#0d1714] dark:[--tpl-bg-c:#0e110e] dark:[--tpl-sun:#eab308] dark:[--tpl-night:#050607] dark:[--tpl-berry:#be185d] dark:[--tpl-rose:#3a1d28] dark:[--tpl-rose-2:#1c1619] dark:[--tpl-mint:#123626] dark:[--tpl-mint-ink:#a7f3d0] dark:[--tpl-sky:#172a4d] dark:[--tpl-sky-ink:#c7dafd] dark:[--tpl-glass:#151915c7] dark:[--tpl-glass-line:#ffffff17] dark:[--tpl-shadow:0_12px_32px_-16px_#00000080] min-h-dvh bg-linear-135 from-(--tpl-bg-a) via-(--tpl-bg-b) to-(--tpl-bg-c) text-ink';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $glass = 'border border-(--tpl-glass-line) bg-(--tpl-glass) shadow-(--tpl-shadow) backdrop-blur-xl';
    $panel = 'grid grid-cols-1 content-start gap-4 rounded-3xl p-5 border border-(--tpl-glass-line) bg-(--tpl-glass) shadow-(--tpl-shadow) backdrop-blur-xl';
    $roundButton = 'relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-(--tpl-glass-line) bg-(--tpl-glass) shadow-(--tpl-shadow) backdrop-blur-xl text-ink transition-colors duration-150 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $smallButton = 'inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuTrigger = '[&>button]:size-9 [&>button]:rounded-full [&>button]:px-0 [&>button>svg:last-child]:hidden';
    $pillBase = 'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pillActive = 'bg-primary text-on-primary';
    $pillIdle = 'text-muted hover:bg-surface hover:text-ink';
    $railBase = 'inline-flex size-11 items-center justify-center rounded-2xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railActive = 'bg-(--tpl-blue) text-(--tpl-on)';
    $railIdle = 'text-(--tpl-rail-idle) hover:text-(--tpl-on)';
    $railTip = 'pointer-events-none absolute top-1/2 left-full z-30 ml-3 -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100 group-has-focus-visible:opacity-100';
    $menuItem = 'flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuIdle = 'text-ink hover:bg-subtle';
    $face = 'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none';
    $pill = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap';
    $dealBase = 'relative flex min-h-44 flex-col rounded-3xl p-4 transition-shadow duration-150';
    $dealSelected = 'ring-2 ring-primary ring-offset-2 ring-offset-canvas';
    $selectable = 'text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary';
    $dayBase = 'relative flex h-10 items-center justify-center gap-1 sm:justify-between rounded-xl px-2 text-xs font-semibold tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $daySelected = 'ring-2 ring-primary ring-offset-2 ring-offset-surface';
    $segment = 'inline-flex h-8 items-center rounded-full px-4 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $segmentOn = 'bg-surface text-ink shadow-(--tpl-shadow)';
    $segmentOff = 'text-muted hover:text-ink';
    $chip = 'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $chipOn = 'border-primary bg-primary text-on-primary';
    $chipOff = 'border-line bg-surface text-ink hover:bg-subtle';
    $tile = 'rounded-2xl border border-line bg-surface p-4';
    $tableWrap = 'relative overflow-x-auto rounded-2xl border border-line bg-surface contain-inline-size focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $th = 'px-4 py-3 font-medium whitespace-nowrap';
    $td = 'px-4 py-3 whitespace-nowrap';
    $thButton = 'inline-flex items-center gap-1 rounded-md font-medium hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

    $html = fn (string $markup) => new HtmlString($markup);
    $svg = fn (string $path, string $class) => '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path '.$path.' /></svg>';
    // Ikon garis 24px. $iconOf memakai nama ikon dari ekspresi Alpine.
    $icon = fn (string $name, string $class = 'size-5') => $html($svg('d="'.$data['icons'][$name].'"', $class));
    $iconOf = fn (string $expr, string $class = 'size-5') => $html($svg(':d="icons['.e($expr).']"', $class));
    // Avatar inisial berwarna dari palet lokal, nama dari ekspresi Alpine.
    $faceOf = fn (string $expr, string $class) => '<span aria-hidden="true" class="'.$face.' '.$class.'" :class="faceTone('.e($expr).')" x-text="initials('.e($expr).')"></span>';
    $team = fn (string $expr, string $ring) => $html('<div role="img" :aria-label="\'Team: \' + '.e($expr).'.join(\', \')" class="flex -space-x-1"><template x-for="name in '.e($expr).'" :key="name">'.$faceOf('name', 'size-7 text-[10px] ring-2 '.$ring).'</template></div>');
    $expand = fn (string $label) => $html('<button type="button" aria-label="Expand '.$label.'" class="'.$smallButton.'" @click="notify(\''.$label.' expanded\', \'Opened in full view\')">'.$icon('expand', 'size-4').'</button>');
    // Judul panel. $subExpr opsional berisi ekspresi Alpine untuk subjudul.
    $head = fn (string $id, string $title, ?string $subExpr = null) => $html('<div class="min-w-0"><h2 id="'.$id.'" class="text-lg font-semibold tracking-tight">'.e($title).'</h2>'.($subExpr ? '<p class="text-sm text-muted" x-text="'.e($subExpr).'"></p>' : '').'</div>');
    $dots = fn (string $label) => $html($icon('dots', 'size-4').'<span class="sr-only">'.$label.' options</span>');
    $iconBox = 'flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle';
    $growthTabs = array_column($data['growthPeriods'], 'label', 'value');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<script type="application/json" id="kirana-data">{!! json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>
<div
  class="{{ $shell }}"
  x-data="{
    ...JSON.parse(document.getElementById('kirana-data').textContent),
    page: 'contacts',
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : 'contacts';
    },
    go(id) {
      window.location.assign('#' + id);
    },
    current(id) {
      return this.page === id ? 'page' : null;
    },
    notify(title, description = '', variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    railClick(item) {
      item.id ? this.go(item.id) : this.notify(item.label, 'Coming up in your workspace');
    },
    openDialog(id) {
      const dialog = document.getElementById(id);
      if (!(dialog instanceof HTMLDialogElement)) return;
      dialog.returnValue = '';
      dialog.showModal();
    },
    {{-- Huruf pertama kata pertama dan terakhir, sama dengan Avatar. --}}
    initials(name) {
      return name.split(' ').filter((_, index, words) => index === 0 || index === words.length - 1).map((word) => word.charAt(0)).join('').toUpperCase();
    },
    {{-- Warna avatar inisial yang selalu sama untuk nama yang sama. --}}
    faceTone(name) {
      return this.faceTones[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % this.faceTones.length];
    },
    rupiah(value) {
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    plural(count, word) {
      return count + ' ' + word + (count === 1 ? '' : 's');
    },
    toggleIn(list, id) {
      return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
    },
    shortDay(iso) {
      const [, month, day] = iso.split('-').map(Number);
      return this.monthNames[month - 1].slice(0, 3) + ' ' + day;
    },
  }"
  x-init="page = readHash()"
  x-on:hashchange.window="page = readHash(); $nextTick(() => document.getElementById('kirana-page-title').focus())"
>
  <header class="flex h-20 items-center gap-3 px-4 lg:px-6">
    <x-markas.drawer title="Menu" side="left">
      <x-slot:trigger>
        <button type="button" aria-label="Open menu" class="{{ $roundButton }} xl:hidden">{{ $icon('menu') }}</button>
      </x-slot:trigger>
      <form method="dialog" class="grid gap-1">
        <template x-for="item in rail" :key="item.label">
          <button type="submit" class="{{ $menuItem }}" :class="page === item.id ? @js($pillActive) : @js($menuIdle)" :aria-current="current(item.id)" @click="railClick(item)">{{ $iconOf('item.icon') }}<span x-text="item.label"></span></button>
        </template>
      </form>
    </x-markas.drawer>
    <div class="flex min-w-0 items-center gap-3">
      <span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-135 from-(--tpl-blue) to-(--tpl-teal) text-(--tpl-on)"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></span>
      <div class="min-w-0 leading-tight">
        <p class="text-lg font-bold tracking-tight">Kirana</p>
        <p class="truncate text-xs text-muted max-[390px]:hidden">Grow. Connect. Succeed.</p>
      </div>
    </div>
    <nav aria-label="Main" class="mx-auto hidden items-center gap-1 rounded-full p-1 xl:flex {{ $glass }}">
      <template x-for="id in topNav" :key="id">
        <button type="button" class="{{ $pillBase }}" :class="page === id ? @js($pillActive) : @js($pillIdle)" :aria-current="current(id)" @click="go(id)" x-text="pages[id].label"></button>
      </template>
    </nav>
    <div class="ml-auto flex items-center gap-2 xl:ml-0">
      <button type="button" aria-label="Messages, 2 unread" class="{{ $roundButton }} max-sm:hidden" @click="notify('2 unread messages', 'Ratna Kusuma replied')">{{ $icon('mail') }}<span aria-hidden="true" class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"></span></button>
      <button type="button" aria-label="Notifications, 3 unread" class="{{ $roundButton }}" @click="notify('3 unread notifications', 'Enterprise Plan moved stage')">{{ $icon('bell') }}<span aria-hidden="true" class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"></span></button>
      <button type="button" aria-label="Open public site" class="{{ $roundButton }} max-sm:hidden" @click="notify('Public site', 'kirana.id opened in a new tab')">{{ $icon('external') }}</button>
      <x-markas.avatar name="Dimas Pratama" size="md" class="ring-2 ring-surface" />
    </div>
  </header>

  <div class="px-4 pb-8 lg:grid lg:grid-cols-[64px_minmax(0,1fr)] lg:gap-5 lg:pr-6 lg:pl-5">
    <div class="hidden lg:block">
      <nav aria-label="Workspace" class="sticky top-6 flex flex-col items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 py-3 shadow-(--tpl-shadow) dark:border dark:border-line">
        <template x-for="item in rail" :key="item.label">
          <span class="group relative inline-flex">
            <button type="button" class="{{ $railBase }}" :class="page === item.id ? @js($railActive) : @js($railIdle)" :aria-label="item.label" :aria-current="current(item.id)" @click="railClick(item)">{{ $iconOf('item.icon') }}</button>
            <span aria-hidden="true" class="{{ $railTip }}" x-text="item.label"></span>
          </span>
        </template>
      </nav>
    </div>

    <main class="grid min-w-0 content-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div class="flex flex-wrap items-center gap-4 xl:flex-nowrap" :class="page !== 'contacts' && 'xl:col-span-2'">
        <div class="flex items-center gap-4">
          <button type="button" aria-label="Back to Home" class="{{ $roundButton }}" @click="go('home')">{{ $icon('back') }}</button>
          <div class="w-48">
            <p class="text-xs text-muted">Kirana / <span x-text="pages[page].label">Contacts</span></p>
            <h1 id="kirana-page-title" tabindex="-1" class="text-[28px] leading-tight font-bold tracking-tight focus:outline-none" x-text="pages[page].title">Customer Information</h1>
          </div>
        </div>
        <div class="grid w-full min-w-0 gap-3 sm:grid-cols-3 xl:flex-1">
          <template x-for="stat in headerStats[page]" :key="stat.label">
            <div class="flex items-center gap-3 rounded-3xl p-3 {{ $glass }}">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-subtle">{{ $iconOf('stat.icon') }}</span>
              <div class="grid min-w-0 gap-1">
                <p class="flex flex-wrap items-center gap-x-2 gap-y-1"><span class="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums" x-text="stat.value"></span><span class="{{ $pill }}" :class="statBadges[stat.tone]" x-text="stat.badge"></span></p>
                <p class="max-w-40 text-xs leading-snug text-muted" x-text="stat.label"></p>
              </div>
            </div>
          </template>
        </div>
      </div>

      {{-- Contacts --}}
      <template x-if="page === 'contacts'">
        <div
          class="contents"
          x-data="{
            deals: dealList.map((item) => ({ ...item })),
            sort: 'default',
            selectedId: '',
            contact: { ...initialContact },
            draft: { ...initialContact },
            view: { year: 2026, month: 9 },
            selectedDay: TODAY,
            mode: 'weighted',
            get deal() {
              return this.deals.find((item) => item.id === this.selectedId) ?? this.deals[0];
            },
            get sortedDeals() {
              const sorters = { default: () => 0, high: (a, b) => b.value - a.value, newest: (a, b) => b.day - a.day };
              return [...this.deals].sort(sorters[this.sort]);
            },
            get fullName() {
              return this.contact.firstName + ' ' + this.contact.lastName;
            },
            get monthName() {
              return this.monthNames[this.view.month];
            },
            {{-- Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong. --}}
            get cells() {
              const { year, month } = this.view;
              const offset = (new Date(year, month, 1).getDay() + 6) % 7;
              const days = new Date(year, month + 1, 0).getDate();
              const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
              return [...cells, ...Array((7 - (cells.length % 7)) % 7).fill(null)];
            },
            dayIso(day) {
              return this.view.year + '-' + String(this.view.month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
            },
            cardButton(tone) {
              return tone === 'night' ? 'bg-(--tpl-on) text-(--tpl-night)' : tone === 'plain' ? 'bg-subtle text-ink hover:bg-line' : 'bg-(--tpl-on)/25 hover:bg-(--tpl-on)/40';
            },
            shift(step) {
              const next = new Date(this.view.year, this.view.month + step, 1);
              this.view = { year: next.getFullYear(), month: next.getMonth() };
            },
            openDeal(id) {
              this.selectedId = id;
              this.openDialog('kirana-deal-drawer');
            },
            onHistorySelect(value) {
              if (value === 'export') return this.notify('History exported', '6 deals, interaction-history.csv');
              this.sort = value;
            },
            onScheduleSelect(value) {
              if (value === 'add') return this.notify('Task added', this.shortDay(this.selectedDay) + ', 09:00');
              this.view = { year: 2026, month: 9 };
              this.selectedDay = this.TODAY;
            },
            onFunnelSelect(value) {
              if (value === 'export') return this.notify('Funnel exported', 'stage-funnel.csv');
              this.mode = value;
            },
            onDealClose(dialog) {
              if (dialog.returnValue !== 'won') return;
              const title = this.deal.title;
              this.deals = this.deals.map((item) => (item.id === this.deal.id ? { ...item, stage: 'Won' } : item));
              this.notify('Deal marked as won', title, 'success');
            },
            onEditClose(dialog) {
              if (dialog.returnValue !== 'save') return;
              this.contact = { ...this.draft };
              this.notify('Contact details saved', this.draft.firstName + ' ' + this.draft.lastName, 'success');
            },
          }"
        >
          <div class="grid min-w-0 content-start gap-4">
            <section aria-labelledby="kirana-history-title" class="{{ $panel }}">
              <div class="flex items-center justify-between gap-3">
                {{ $head('kirana-history-title', 'Interaction History') }}
                <div class="flex shrink-0 gap-2">
                  <x-markas.dropdown-menu :items="$data['historyMenu']" class="{{ $menuTrigger }}" x-on:markas-select="onHistorySelect($event.detail)"><x-slot:trigger>{{ $dots('Interaction History') }}</x-slot:trigger></x-markas.dropdown-menu>
                  {{ $expand('Interaction History') }}
                </div>
              </div>
              <ul role="list" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <template x-for="item in sortedDeals" :key="item.id">
                  <li :data-deal="item.id" class="{{ $dealBase }}" :class="[tones[item.tone], item.id === selectedId && @js($dealSelected)]">
                    <div class="flex items-start justify-between gap-3">
                      <p class="pt-1 text-xs font-medium" x-text="'Oct ' + item.day"></p>
                      <button type="button" class="relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-150 {{ $focusRing }}" :class="cardButton(item.tone)" :aria-label="'Open ' + item.title" @click="openDeal(item.id)">{{ $iconOf("item.tone === 'night' ? 'arrow' : 'dots'", 'size-4') }}</button>
                    </div>
                    <h3 class="mt-1 max-w-56 text-lg leading-snug font-semibold"><button type="button" class="{{ $selectable }}" :aria-pressed="item.id === selectedId ? 'true' : 'false'" @click="openDeal(item.id)" x-text="item.title"></button></h3>
                    <div class="mt-auto flex items-end justify-between gap-2 pt-4">
                      <p class="text-lg font-bold tracking-tight tabular-nums" x-text="rupiah(item.value)"></p>
                      {{ $team('item.team', 'ring-(--card)') }}
                    </div>
                  </li>
                </template>
              </ul>
            </section>
            <div class="grid gap-4 lg:grid-cols-2">
              <section aria-labelledby="kirana-schedule-title" class="{{ $panel }}">
                <div class="flex items-center justify-between gap-3">
                  {{ $head('kirana-schedule-title', 'Tasks Schedule') }}
                  <div class="flex shrink-0 gap-2">
                    <x-markas.dropdown-menu :items="$data['scheduleMenu']" class="{{ $menuTrigger }}" x-on:markas-select="onScheduleSelect($event.detail)"><x-slot:trigger>{{ $dots('Tasks Schedule') }}</x-slot:trigger></x-markas.dropdown-menu>
                    {{ $expand('Tasks Schedule') }}
                  </div>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <h3 class="flex items-baseline gap-2 text-base font-semibold"><span x-text="monthName"></span><span class="text-sm font-normal text-muted" x-text="view.year"></span></h3>
                  <div class="flex gap-2">
                    <button type="button" aria-label="Previous month" class="{{ $smallButton }}" @click="shift(-1)">{{ $icon('prev', 'size-4') }}</button>
                    <button type="button" aria-label="Next month" class="{{ $smallButton }}" @click="shift(1)">{{ $icon('next', 'size-4') }}</button>
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1.5">
                  @foreach ($data['weekdays'] as $day)
                    <span aria-hidden="true" class="text-center text-xs font-medium text-muted">{{ $day }}</span>
                  @endforeach
                  <template x-for="(day, index) in cells" :key="index">
                    <div class="contents">
                      <template x-if="day === null"><span aria-hidden="true"></span></template>
                      <template x-if="day !== null">
                        <button type="button" class="{{ $dayBase }}" :class="[dayTones[marks[dayIso(day)]?.tone ?? 'none'], selectedDay === dayIso(day) && @js($daySelected)]" :aria-pressed="selectedDay === dayIso(day) ? 'true' : 'false'" @click="selectedDay = dayIso(day)">
                          <span aria-hidden="true" x-text="day"></span><span class="sr-only" x-text="monthName + ' ' + day + (marks[dayIso(day)] ? ', ' + marks[dayIso(day)].task : '')"></span>
                          <template x-if="marks[dayIso(day)]">{!! $faceOf('marks[dayIso(day)].who', 'size-5 text-[8px] ring-1 ring-(--tpl-on) max-sm:hidden') !!}</template>
                        </button>
                      </template>
                    </div>
                  </template>
                </div>
                <p aria-live="polite" data-agenda class="text-sm text-muted"><span class="font-semibold text-ink" x-text="shortDay(selectedDay)"></span><span x-text="marks[selectedDay] ? ': ' + marks[selectedDay].task + ' with ' + marks[selectedDay].who : ': no tasks scheduled'"></span></p>
              </section>
              <section aria-labelledby="kirana-funnel-title" class="{{ $panel }}">
                <div class="flex items-center justify-between gap-3">
                  {{ $head('kirana-funnel-title', 'Stage Funnel') }}
                  <div class="flex shrink-0 gap-2">
                    <x-markas.dropdown-menu :items="$data['funnelMenu']" class="{{ $menuTrigger }}" x-on:markas-select="onFunnelSelect($event.detail)"><x-slot:trigger>{{ $dots('Stage Funnel') }}</x-slot:trigger></x-markas.dropdown-menu>
                    {{ $expand('Stage Funnel') }}
                  </div>
                </div>
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p data-funnel-total class="text-2xl font-bold tracking-tight tabular-nums" x-text="funnel[mode].total"></p>
                    <p class="text-xs text-muted">Total in Pipeline</p>
                  </div>
                  <div role="group" aria-label="Pipeline value" class="inline-flex rounded-full bg-subtle p-1">
                    <template x-for="value in funnelModes" :key="value">
                      <button type="button" class="{{ $segment }}" :class="mode === value ? @js($segmentOn) : @js($segmentOff)" :aria-pressed="mode === value ? 'true' : 'false'" @click="mode = value" x-text="value === 'weighted' ? 'Weighted' : 'Total'"></button>
                    </template>
                  </div>
                </div>
                <ol class="grid gap-2.5" aria-label="Pipeline by stage">
                  <template x-for="([label, value], index) in funnel[mode].steps" :key="label">
                    <li class="mx-auto flex h-14 items-center justify-between gap-3 rounded-full bg-subtle pr-2 pl-5" :class="funnelWidths[index]">
                      <span class="grid leading-tight"><span class="text-xs text-muted" x-text="label"></span><span class="text-sm font-bold tabular-nums" x-text="value"></span></span>
                      <template x-if="index === 0"><button type="button" class="{{ $smallButton }} size-10" :aria-label="'Open ' + label" @click="notify(label, value + ' in this stage')">{{ $icon('arrow', 'size-4') }}</button></template>
                      <template x-if="index !== 0"><span class="size-10" aria-hidden="true"></span></template>
                    </li>
                  </template>
                </ol>
              </section>
            </div>
          </div>

          <div class="grid min-w-0 grid-cols-1 content-start gap-4 xl:col-start-2 xl:row-span-2 xl:row-start-1">
            <section aria-labelledby="kirana-profile-name" class="grid gap-4 rounded-3xl border border-(--tpl-glass-line) bg-linear-to-b from-(--tpl-rose) to-(--tpl-rose-2) p-4 shadow-(--tpl-shadow)">
              <div class="flex items-center justify-between gap-2">
                <div class="flex gap-2">
                  <button type="button" aria-label="Forward contact" class="{{ $smallButton }}" @click="notify('Contact forwarded', fullName)">{{ $icon('forward', 'size-4') }}</button>
                  <button type="button" aria-label="Share profile" class="{{ $smallButton }}" @click="notify('Share link ready', fullName)">{{ $icon('share', 'size-4') }}</button>
                </div>
                <div class="flex gap-2">
                  <x-markas.dropdown-menu :items="$data['profileMenu']" class="{{ $menuTrigger }}" x-on:markas-select="notify($event.detail, fullName)"><x-slot:trigger>{{ $dots('Profile') }}</x-slot:trigger></x-markas.dropdown-menu>
                  {{ $expand('Profile') }}
                </div>
              </div>
              <div class="grid justify-items-center gap-1 pb-1 text-center">
                {!! $faceOf('fullName', 'mb-2 size-24 text-2xl ring-4 ring-surface') !!}
                <h2 id="kirana-profile-name" class="text-xl font-bold tracking-tight" x-text="fullName"></h2>
                <p class="text-sm text-muted">Chief Growth Officer</p>
                <p class="text-sm font-medium">PT Nusantara Digital</p>
              </div>
              <div class="flex flex-wrap justify-center gap-2">
                <template x-for="action in profileActions" :key="action.label">
                  <button type="button" class="{{ $smallButton }} size-10 border-transparent" :aria-label="action.label" @click="notify(action.label, fullName)">{{ $iconOf('action.icon', 'size-4') }}</button>
                </template>
              </div>
            </section>

            <section aria-labelledby="kirana-details-title" class="{{ $panel }}">
              <div class="flex items-center justify-between gap-3">
                {{ $head('kirana-details-title', 'Detailed Information') }}
                <div class="flex shrink-0 gap-2">
                  <x-markas.drawer title="Edit contact details" x-on:close="onEditClose($event.currentTarget)">
                    <x-slot:trigger>
                      <button type="button" aria-label="Edit details" class="{{ $smallButton }}" @click="draft = { ...contact }">{{ $icon('pencil', 'size-4') }}</button>
                    </x-slot:trigger>
                    <div class="grid gap-4">
                      @foreach ($data['contactFields'] as $field)
                        <x-markas.input :label="$field['label']" :type="$field['type']" :name="$field['key']" x-model="draft.{{ $field['key'] }}" />
                      @endforeach
                    </div>
                    <x-slot:footer>
                      <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                      <x-markas.button type="submit" value="save">Save changes</x-markas.button>
                    </x-slot:footer>
                  </x-markas.drawer>
                  {{ $expand('Detailed Information') }}
                </div>
              </div>
              <ul class="grid grid-cols-1">
                <template x-for="field in contactFields" :key="field.key">
                  <li class="flex items-center gap-3 py-2.5">
                    <span class="{{ $iconBox }}">{{ $iconOf('field.icon', 'size-4') }}</span>
                    <div class="min-w-0 flex-1">
                      <p class="text-xs text-muted" x-text="field.label"></p>
                      <p class="truncate text-sm font-semibold" x-text="contact[field.key]"></p>
                    </div>
                    <template x-if="field.add">
                      <button type="button" class="{{ $smallButton }} size-8" :aria-label="field.add" @click="notify(field.add, fullName)">{{ $icon('plus', 'size-4') }}</button>
                    </template>
                  </li>
                </template>
                <li class="flex items-center gap-3 py-2.5">
                  <span class="{{ $iconBox }}">{{ $icon('share', 'size-4') }}</span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-muted">Sources</p>
                    <div class="mt-1 flex gap-1.5">
                      @foreach ($data['sources'] as $source)
                        <span role="img" aria-label="{{ $source['label'] }}" class="flex size-7 items-center justify-center rounded-full text-(--tpl-on) {{ $source['tone'] }}">{{ $icon($source['icon'], 'size-3.5') }}</span>
                      @endforeach
                    </div>
                  </div>
                </li>
                <li class="flex items-center gap-3 py-2.5">
                  <span class="{{ $iconBox }}">{{ $icon('clock', 'size-4') }}</span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-muted">Last Contacted</p>
                    <p class="text-sm font-semibold">Oct 14, 2026, 10:20</p>
                  </div>
                  <button type="button" aria-label="Log contact" class="{{ $smallButton }} size-8" @click="notify('Contact logged', fullName)">{{ $icon('plus', 'size-4') }}</button>
                </li>
              </ul>
            </section>
          </div>

          <x-markas.drawer id="kirana-deal-drawer" title="Deal details" x-on:close="onDealClose($event.currentTarget)">
            <div class="grid gap-4 text-ink">
              <div class="rounded-3xl p-4" :class="tones[deal.tone]">
                <p class="text-xs font-medium" x-text="'Oct ' + deal.day + ', 2026'"></p>
                <p class="mt-1 text-lg leading-snug font-semibold" x-text="deal.title"></p>
                <p class="mt-3 text-2xl font-bold tabular-nums" x-text="rupiah(deal.value)"></p>
              </div>
              <dl class="grid gap-3">
                <div class="flex justify-between gap-3"><dt class="text-muted">Stage</dt><dd data-stage class="font-semibold" x-text="deal.stage"></dd></div>
                <div class="flex justify-between gap-3"><dt class="text-muted">Customer</dt><dd class="font-semibold" x-text="fullName"></dd></div>
                <div class="flex items-center justify-between gap-3"><dt class="text-muted">Team</dt><dd>{{ $team('deal.team', 'ring-surface') }}</dd></div>
              </dl>
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit" value="cancel">Close</x-markas.button>
              <x-markas.button type="submit" value="won">Mark as won</x-markas.button>
            </x-slot:footer>
          </x-markas.drawer>
        </div>
      </template>

      {{-- Home --}}
      <template x-if="page === 'home'">
        <div class="grid content-start gap-4 lg:grid-cols-2 xl:col-span-2" x-data="{ done: [...DONE_TASKS] }">
          <section aria-labelledby="kirana-today-title" class="{{ $panel }}">
            <div class="flex items-center justify-between gap-3">{{ $head('kirana-today-title', "Today's tasks", "done.length + ' of ' + todayTasks.length + ' done'") }}</div>
            <x-markas.progress :value="count($data['DONE_TASKS'])" :max="count($data['todayTasks'])" aria-label="Tasks completed" x-bind:value="done.length" />
            <ul class="grid gap-2">
              @foreach ($data['todayTasks'] as $task)
                <li class="rounded-2xl bg-surface p-3">
                  <x-markas.checkbox :label="$task['title']" :description="$task['time']" value="{{ $task['id'] }}" x-model="done" />
                </li>
              @endforeach
            </ul>
          </section>
          <section aria-labelledby="kirana-activity-title" class="{{ $panel }}">
            <div class="flex items-center justify-between gap-3">{{ $head('kirana-activity-title', 'Recent activity', "'Latest updates from your team'") }}</div>
            <ol class="grid gap-4">
              <template x-for="item in activity" :key="item.when">
                <li class="flex items-start gap-3">
                  {!! $faceOf('item.who', 'size-9 text-xs') !!}
                  <div class="min-w-0 flex-1">
                    <p class="text-sm"><span class="font-semibold" x-text="item.who"></span> <span x-text="item.what"></span></p>
                    <p class="text-xs text-muted" x-text="item.when"></p>
                  </div>
                </li>
              </template>
            </ol>
          </section>
        </div>
      </template>

      {{-- Book Summaries --}}
      <template x-if="page === 'summaries'">
        <section aria-labelledby="kirana-books-title" class="{{ $panel }} xl:col-span-2" x-data="{ topic: 'All', read: [...READ_BOOKS], get visible() { return this.books.filter((book) => this.topic === 'All' || book.topic === this.topic); } }">
          <div class="flex items-center justify-between gap-3">{{ $head('kirana-books-title', 'Library', "read.length + ' of ' + books.length + ' read'") }}</div>
          <div role="group" aria-label="Filter by topic" class="flex flex-wrap gap-2">
            <template x-for="item in topics" :key="item">
              <button type="button" class="{{ $chip }}" :class="topic === item ? @js($chipOn) : @js($chipOff)" :aria-pressed="topic === item ? 'true' : 'false'" @click="topic = item" x-text="item"></button>
            </template>
          </div>
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <template x-for="(book, index) in visible" :key="book.id">
              <li :data-book="book.id" class="grid gap-3 rounded-3xl border border-line bg-surface p-3">
                <div aria-hidden="true" class="relative h-32 overflow-hidden rounded-2xl" :class="tones[book.tone]">
                  <span class="absolute -top-6 -right-4 size-24 rounded-full bg-(--tpl-on)/20"></span>
                  <span class="absolute bottom-3 left-4 h-2 rounded-full bg-(--tpl-on)/40" :style="{ width: 30 + ((index * 17) % 40) + '%' }"></span>
                  <span class="absolute bottom-7 left-4 h-2 w-1/4 rounded-full bg-(--tpl-on)/25"></span>
                </div>
                <div class="flex items-start justify-between gap-3 px-1">
                  <div class="min-w-0">
                    <h3 class="font-semibold" x-text="book.title"></h3>
                    <p class="text-sm text-muted" x-text="book.author + ', ' + book.minutes + ' min'"></p>
                  </div>
                  <span class="{{ $pill }} {{ $data['statBadges']['sky'] }}" x-text="book.topic"></span>
                </div>
                <button type="button" class="{{ $chip }} relative justify-center" :class="read.includes(book.id) ? @js($chipOn) : @js($chipOff)" :aria-pressed="read.includes(book.id) ? 'true' : 'false'" @click="read = toggleIn(read, book.id)"><span aria-hidden="true" x-text="read.includes(book.id) ? 'Read' : 'Mark as read'"></span><span class="sr-only" x-text="(read.includes(book.id) ? 'Read' : 'Mark as read') + ': ' + book.title"></span></button>
              </li>
            </template>
          </ul>
        </section>
      </template>

      {{-- Founders --}}
      <template x-if="page === 'founders'">
        <section aria-labelledby="kirana-founders-title" class="{{ $panel }} xl:col-span-2" x-data="{ query: '', get visible() { const needle = this.query.trim().toLowerCase(); return this.founders.filter((item) => (item.name + ' ' + item.company + ' ' + item.sector).toLowerCase().includes(needle)); } }">
          <div class="flex items-center justify-between gap-3">{{ $head('kirana-founders-title', 'People to know', "plural(visible.length, 'founder')") }}</div>
          <x-markas.input label="Search founders" type="search" class="max-w-sm" x-model="query" />
          <template x-if="visible.length === 0"><p class="text-sm text-muted">No founders match your search.</p></template>
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <template x-for="item in visible" :key="item.name">
              <li class="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4">
                {!! $faceOf('item.name', 'size-12 text-sm') !!}
                <div class="min-w-0 flex-1">
                  <h3 class="truncate font-semibold" x-text="item.name"></h3>
                  <p class="truncate text-sm text-muted" x-text="item.company + ', ' + item.sector"></p>
                  <p class="text-xs font-semibold tabular-nums" x-text="rupiah(item.raised) + ' raised'"></p>
                </div>
                <x-markas.button variant="secondary" size="sm" x-bind:aria-label="'Connect with ' + item.name" x-on:click="notify('Intro requested', item.name)">Connect</x-markas.button>
              </li>
            </template>
          </ul>
        </section>
      </template>

      {{-- Finance --}}
      <template x-if="page === 'finance'">
        <div
          class="grid content-start gap-4 xl:col-span-2 xl:grid-cols-[minmax(0,1fr)_360px]"
          x-data="{
            sortKey: 'due',
            dir: 1,
            get rows() {
              const key = this.sortKey;
              return [...this.invoices].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * this.dir);
            },
            sortBy(key) {
              this.dir = this.sortKey === key ? -this.dir : 1;
              this.sortKey = key;
            },
            ariaSort(key) {
              return this.sortKey === key ? (this.dir === 1 ? 'ascending' : 'descending') : null;
            },
            get peak() {
              return Math.max(...this.cashflow.map(([, value]) => value));
            },
          }"
        >
          <section aria-labelledby="kirana-invoices-title" class="{{ $panel }}">
            <div class="flex items-center justify-between gap-3">{{ $head('kirana-invoices-title', 'Invoices', "'October 2026'") }}</div>
            <div tabindex="0" role="region" aria-label="Invoice table" class="{{ $tableWrap }}">
              <table class="w-full text-sm">
                <thead class="bg-subtle text-muted">
                  <tr>
                    <th scope="col" class="{{ $th }} text-left">Invoice</th>
                    @foreach ($data['invoiceColumns'] as $column)
                      <th scope="col" class="{{ $th }} {{ $column['align'] }}" :aria-sort="ariaSort('{{ $column['key'] }}')"><button type="button" class="{{ $thButton }}" @click="sortBy('{{ $column['key'] }}')">{{ $column['label'] }}{{ $icon('sort', 'size-3.5') }}</button></th>
                    @endforeach
                    <th scope="col" class="{{ $th }} text-left">Status</th>
                    <th scope="col" class="{{ $th }} text-right"><span class="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  <template x-for="invoice in rows" :key="invoice.id">
                    <tr :data-row="invoice.id" class="border-t border-line">
                      <td class="{{ $td }}"><span class="font-semibold" x-text="invoice.id"></span><span class="block text-xs text-muted" x-text="invoice.customer"></span></td>
                      <td class="{{ $td }}" x-text="shortDay(invoice.due)"></td>
                      <td class="{{ $td }} text-right font-semibold tabular-nums" x-text="rupiah(invoice.amount)"></td>
                      <td class="{{ $td }}">
                        @foreach ($data['statusVariant'] as $status => $variant)
                          <x-markas.badge :variant="$variant" x-show="invoice.status === '{{ $status }}'">{{ $status }}</x-markas.badge>
                        @endforeach
                      </td>
                      <td class="{{ $td }} text-right">
                        <template x-if="invoice.status !== 'Paid'">
                          <x-markas.button variant="ghost" size="sm" x-bind:aria-label="'Remind ' + invoice.id" x-on:click="notify('Reminder sent', invoice.id + ' to ' + invoice.customer)">Remind</x-markas.button>
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </section>
          <section aria-labelledby="kirana-cash-title" class="{{ $panel }}">
            <div class="flex items-center justify-between gap-3">{{ $head('kirana-cash-title', 'Cash flow', "'Rp million per month'") }}</div>
            <div role="img" :aria-label="'Cash flow: ' + cashflow.map(([month, value]) => month + ' Rp ' + value + ' million').join(', ')" class="flex h-56 items-end gap-3">
              <template x-for="([month, value], index) in cashflow" :key="month">
                <div class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
                  <span class="text-center text-xs font-semibold tabular-nums" x-text="value"></span>
                  <div class="rounded-xl" :class="index === cashflow.length - 1 ? 'bg-(--tpl-teal)' : 'bg-(--tpl-mint)'" :style="{ height: Math.round((value / peak) * 80) + '%' }"></div>
                  <span class="text-center text-xs text-muted" x-text="month"></span>
                </div>
              </template>
            </div>
          </section>
        </div>
      </template>

      {{-- Growth --}}
      <template x-if="page === 'growth'">
        <section aria-labelledby="kirana-growth-title" class="{{ $panel }} xl:col-span-2">
          <div class="flex items-center justify-between gap-3">{{ $head('kirana-growth-title', 'Lead generation', "'New leads per week'") }}</div>
          <x-markas.tabs :items="$growthTabs" default-value="30d">
            @foreach ($data['growthPeriods'] as $index => $period)
              <x-slot :name="$period['value']">
                <div class="grid gap-4">
                  <dl class="grid gap-3 sm:grid-cols-3">
                    @foreach ($period['metrics'] as [$label, $value])
                      <div class="{{ $tile }}">
                        <dt class="text-xs text-muted">{{ $label }}</dt>
                        <dd class="text-xl font-bold tracking-tight tabular-nums">{{ $value }}</dd>
                      </div>
                    @endforeach
                  </dl>
                  @php $peak = max($period['bars']); @endphp
                  <div role="img" aria-label="New leads, {{ $period['label'] }}: {{ implode(', ', array_map(fn ($value, $i) => $data['barLabels'][$i].' '.$value, $period['bars'], array_keys($period['bars']))) }}" class="flex h-48 items-end gap-3">
                    @foreach ($period['bars'] as $i => $value)
                      <div data-bar class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
                        <div class="rounded-xl {{ $i === count($period['bars']) - 1 ? 'bg-(--tpl-blue)' : 'bg-(--tpl-sky)' }}" style="height: {{ round($value / $peak * 100) }}%"></div>
                        <span class="text-center text-xs text-muted">{{ $data['barLabels'][$i] }}</span>
                      </div>
                    @endforeach
                  </div>
                </div>
              </x-slot>
            @endforeach
          </x-markas.tabs>
        </section>
      </template>

      {{-- Projects --}}
      <template x-if="page === 'projects'">
        <section aria-labelledby="kirana-projects-title" class="{{ $panel }} xl:col-span-2" x-data="{ filter: 'All', get visible() { return this.projects.filter((item) => this.filter === 'All' || item.status === this.filter); } }">
          <div class="flex items-center justify-between gap-3">{{ $head('kirana-projects-title', 'Delivery board', "plural(visible.length, 'project')") }}</div>
          <div role="group" aria-label="Filter by status" class="flex flex-wrap gap-2">
            <template x-for="item in projectFilters" :key="item">
              <button type="button" class="{{ $chip }}" :class="filter === item ? @js($chipOn) : @js($chipOff)" :aria-pressed="filter === item ? 'true' : 'false'" @click="filter = item" x-text="item"></button>
            </template>
          </div>
          <ul class="grid gap-3 md:grid-cols-2">
            <template x-for="item in visible" :key="item.id">
              <li :data-project="item.id" class="grid gap-3 rounded-3xl border border-line bg-surface p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="font-semibold" x-text="item.name"></h3>
                    <p class="text-sm text-muted" x-text="item.client + ', due ' + item.due"></p>
                  </div>
                  @foreach ($data['projectVariant'] as $status => $variant)
                    <x-markas.badge :variant="$variant" x-show="item.status === '{{ $status }}'">{{ $status }}</x-markas.badge>
                  @endforeach
                </div>
                <div class="grid gap-1.5">
                  <p class="flex justify-between gap-4 text-sm"><span class="font-medium">Progress</span><span class="text-muted tabular-nums" x-text="item.progress + '%'"></span></p>
                  <x-markas.progress :value="0" :max="100" x-bind:id="'kirana-progress-' + item.id" x-bind:value="item.progress" x-bind:aria-label="item.name + ' progress'" />
                </div>
              </li>
            </template>
          </ul>
        </section>
      </template>
    </main>
  </div>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
