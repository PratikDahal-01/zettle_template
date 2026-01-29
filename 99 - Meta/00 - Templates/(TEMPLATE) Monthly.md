---
date: <% moment(tp.file.title, 'YYYY-[M]MM').startOf('month').add(0,'days').format("YYYY-MM-DD") %>
cssclasses:
  - daily
tags:
  - Monthly
---
```calendar-nav
```

```calendar-timeline
mode: month
```

<%*
let start_of_month = moment(tp.file.title, 'YYYY-MM').startOf('month');
let days_in_month = start_of_month.daysInMonth();
tR +='>[!picture]- Pictures\n';
tR += Array(days_in_month).fill(null).map((x, i)=>`>![[${moment(start_of_month).add(i, 'd').format('YYYY-MM-DD[]#YYYY-MM-DD png')}]]`).join("\n")+'\n';
%>

### Month Prep

- 

---
>[!highlight]- Standout Days
>```dataview
TABLE aliases 
WHERE aliases != null
AND length(aliases) >= 1
AND date >= date(<% moment(tp.file.title, "YYYY-[M]MM").startOf("month").format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title, "YYYY-[M]MM").endOf("month").format("YYYY-MM-DD") %>)

Standout days are the one in the month with aliases 

>[!highlight]- Highlights!
>```dataview
TASK
FROM ""
WHERE contains(text, "#log/highlight")
AND date >= date(<% moment(tp.file.title, 'YYYY-[M]MM').startOf('month').add(0,'days').format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title, 'YYYY-[M]MM').startOf('month').add(1,'months').add(-1, 'days').format("YYYY-MM-DD") %>)
GROUP BY file.name AS filename
SORT filename ASC

>[!calendar]- Weekly Reviews
>```dataview
TASK
WHERE contains(text, "#log/week-review")
AND date >= date(<% moment(tp.file.title, 'YYYY-[M]MM').startOf('month').add(0,'days').format("YYYY-MM-DD") %>)
AND date <= date(<% moment(tp.file.title, 'YYYY-[M]MM').endOf('month').format("YYYY-MM-DD") %>)
GROUP BY file.name AS filename
SORT filename ASC


---
- [ ] #log/month-review
---
## Wheel of Life

```chart
type: polarArea
labels: [Soul, Career/Work, Love/Relationships, Health/Fitness, Personal Growth, Fun/Recreation, Social, Finance]
series:
	- title:
	  data: [5, 5, 5, 5, 5, 5, 5, 5]
tension: 0.5
width: 50%
labelColors: true
fill: true
beginAtZero: true
rMax: 10
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
legendPosition: right
```

- [ ] Soul : 5 #log/monthly-soul 
    - Meditation, prayer, yoga, reading spiritual texts, attending religious services, spending time in nature, practicing gratitude.
- [ ] Career/Work : 5 #log/monthly-career
    - Achieving career milestones, acquiring new skills, job performance, work-life balance, networking, and professional development.
- [ ] Love/Relationships : 5 #log/monthly-relationships
    - Spending quality time with a partner, open communication, romantic gestures, resolving conflicts, and shared activities.
- [ ]  Health/Fitness : 5 #log/monthly-health
    - Regular exercise, balanced diet, routine health check-ups, adequate sleep, and stress management.
- [ ] Personal Growth : 5 #log/monthly-personal-growth
    - Reading, taking courses, learning new skills, setting personal goals, practicing mindfulness, and self-reflection.
- [ ] Fun/Recreation : 5 #log/monthly-fun
     - Playing sports, traveling, engaging in hobbies, watching movies, playing games, and any activities that you find enjoyable and relaxing.
- [ ] Social : 5 #log/monthly-social
    - Socializing with friends, attending social events, participating in community
- [ ] Finance : 5 #log/monthly-finance
    - Saved and invested good money
---
#### Statistics

>[!multi-column]
>
>>[!gatestreak]- GATE Streak
>>```tracker
>>searchType: frontmatter
>>searchTarget: studied-for-gate, not-fapped
>>datasetName: GATE-study, No-Fapped
>>month:
>>	startWeekOn: 'Sun'
>>	threshold: 0.99,0.99
>>	color: green
>>	initMonth: <% moment (tp.file.title, 'YYYY-[M]MM').format('YYYY-MM') %>
>>	circleColorByValue: true
>>	todayRingColor: white
>>```
>
>>[!todo]- GATE Avg.
>>```tracker
>>searchType: frontmatter
>>searchTarget: studied-for-gate, not-fapped
>>datasetName: GATE-study, No-Fapped
>>startDate: <% moment (tp.file.title, 'YYYY-[M]MM').startOf('month').add(0,'days').format("YYYY-MM-DD") %>
>>endDate: <% moment (tp.file.title, 'YYYY-[M]MM').endOf('month').format("YYYY-MM-DD") %>
>>summary:
>>	template:
>>		" - Average Hours Studied: {{average()}}
>>		\n - Total Hours Studied: {{sum()}}
>>		\n - Average Days Not Fapped: {{average(dataset(1))}}"
>>```




