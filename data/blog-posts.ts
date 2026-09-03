export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl: string;
  status: "draft" | "published";
  themeUsed: string;
  readTimeMinutes: number;
  category: string;
};

export const MKT_01_POSTS: BlogPost[] = [
  {
    id: "post-001",
    title: "How to Transfer Your Prescription to iHealth Pharmacy in 3 Easy Steps",
    slug: "how-to-transfer-your-prescription",
    excerpt: "Switching pharmacies is simpler than most people think. Here's exactly what to expect when you transfer your prescriptions to iHealth Pharmacy in Abbotsford.",
    content: `Switching pharmacies should feel like a relief, not a chore. If you've been waiting for a reason to move your prescriptions somewhere closer to home, somewhere that knows your name, or somewhere with shorter lines, this is your sign. Transferring to iHealth Pharmacy in Abbotsford takes most people less than five minutes of their time. We handle the rest.

## Step 1: Tell us where you're transferring from

You don't need to call your old pharmacy. You don't need to fill out forms. Just give us a few details and we do the heavy lifting.

You can transfer in three ways:

- Walk into iHealth Pharmacy at our Abbotsford location and speak with a pharmacist
- Call us directly during business hours
- Submit a transfer request through our website at any time

When you reach out, have the following ready if you can find them: your current pharmacy's name and phone number, the prescription numbers you want to transfer, and your BC Services Card or personal health number. Don't worry if you're missing some of these — we can usually track everything down with just your name, date of birth, and address.

## Step 2: We contact your current pharmacy

Once we have your details, our team contacts your existing pharmacy on your behalf. We verify each prescription, check your refill history, and confirm there are no holds or restrictions on file.

This step typically takes less than 24 hours. If any prescription has expired or has no refills remaining, we reach out to your doctor for a renewal — you don't need to book an appointment or make a phone call. We'll text or call you only when there's something you actually need to know about.

If you're transferring multiple prescriptions from different pharmacies (say, one for daily meds and another for specialty medications), that's fine too. We'll coordinate the transfers in whatever order works best for you.

## Step 3: Pick up, delivery, or automatic refills

Once everything is transferred, you have three options:

**Pick up in store.** Pop in, grab your prescriptions, and ask the pharmacist any questions. Most refills are ready within 15 minutes of arriving.

**Free delivery.** If you're in Abbotsford and your order totals over $25, we deliver to your door at no charge. Same-day delivery is available for most requests placed before 2pm on weekdays.

**Automatic refills.** For ongoing medications, we can enroll you in our auto-refill program. Your prescriptions are filled a few days before you run out, and we text you when they're ready. You can pause or cancel anytime.

## Why people transfer to iHealth

Abbotsford residents switch to us for a few common reasons. Some are looking for shorter wait times and more personal attention. Others want a pharmacy that offers services their previous one didn't, like minor ailment prescribing, travel vaccinations, or compliance packaging for multiple daily medications. Many just want a pharmacist who speaks their language — we offer service in English, Punjabi, and Hindi.

A few things that set us apart:

- Open 7 days a week with extended hours
- Free delivery within Abbotsford
- Multilingual staff
- No-cost medication reviews for BC Pharmacare patients
- A pharmacist on duty who can prescribe for common minor ailments

## A note on your records

Your medication history follows you, not your pharmacy. When you transfer, your profile moves to our system and stays there until you ask us to send it somewhere else. If you ever move, switch jobs, or travel, just let us know and we'll forward your records to your new pharmacy.

## Ready to transfer?

Call us at 604-853-1893 or stop by the pharmacy in person. If you're not sure whether to make the switch, come in for a chat first — no commitment required. We'd rather you feel confident about the move than rush through it.

Switching pharmacies is a small step that often makes a noticeable difference in how you manage your health. We make it easy because we'd rather spend time getting to know you than shuffling paperwork.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-09-04",
    tags: ["prescriptions", "transfer", "Abbotsford"],
    imageUrl: "/blog/post-1.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 4,
    category: "New Patients",
  },

  {
    id: "post-002",
    title: "Flu Season 2026: What Abbotsford Residents Need to Know",
    slug: "flu-season-2026-abbotsford",
    excerpt: "When does flu season peak in BC, who should get vaccinated, and what's new this year. A practical guide for Fraser Valley families.",
    content: `Last flu season in BC was unusually early, with cases climbing in late October and peaking well before the new year. If you're planning to wait until December to get your flu shot, you may be too late. Here's what Abbotsford residents should know heading into the 2026–2027 influenza season.

## When to get vaccinated

The optimal window for flu vaccination in the Fraser Valley is mid-September through the end of November. The vaccine takes about two weeks to build full protection, so getting it before community transmission ramps up gives you the best coverage.

That said, getting vaccinated later is still better than not getting vaccinated at all. Flu often circulates in BC into March and April, particularly in years when the dominant strain shifts mid-season. If you missed the fall window, talk to a pharmacist in January or February — we can still help.

## Who should get the flu shot

Public health officials in BC recommend the influenza vaccine for everyone six months and older, with extra emphasis on certain groups:

- Adults 65 and older (a higher-dose formulation is recommended)
- Pregnant people at any stage of pregnancy
- Children under five, especially those under two
- People with chronic conditions like asthma, diabetes, heart disease, or kidney disease
- Residents of long-term care facilities
- Indigenous people
- Frontline healthcare and essential workers

If you fall into one of these groups, the flu shot is free in BC. For everyone else, the cost is around $20 to $30, often covered by extended health benefits. We can bill most plans directly so you don't pay out of pocket.

## What's new this year

The 2026–2027 flu vaccine in Canada is a trivalent formulation, updated to match the strains expected to circulate based on southern hemisphere data from their just-completed winter. The composition includes updated influenza A (H1N1 and H3N2) components and a refreshed B/Victoria lineage strain.

A few practical updates worth knowing:

- The higher-dose formulation for adults 65+ has been more widely distributed and is the recommended choice for that age group
- Children under nine receiving flu vaccine for the first time need two doses, four weeks apart — book early if your child is in this group
- Co-administration with the updated COVID-19 vaccine is recommended and safe

## What to expect after the shot

Most people experience nothing more than a sore arm for a day or two. Some feel mild fatigue or low-grade aches. These are signs your immune system is responding, not the flu itself — the injectable vaccine contains inactivated virus and cannot cause influenza.

Serious reactions are rare. If you develop high fever, difficulty breathing, or swelling around the injection site that worsens over 24 hours, contact us or your family doctor. Allergic reactions typically occur within 15 minutes, which is why we ask you to wait briefly in the pharmacy after your shot.

## When to stay home

The flu and the common cold share many symptoms, but influenza tends to come on faster and hit harder. If you have a sudden fever, body aches, fatigue, and a dry cough, assume it's flu and stay home until your fever has been gone for at least 24 hours without the help of medication.

Antiviral medications like oseltamivir (Tamiflu) can shorten the duration of flu if started within 48 hours of symptoms. A pharmacist can assess whether you qualify and, in many cases, prescribe directly without a doctor's visit.

## Walk-ins welcome

No appointment needed for flu shots at iHealth Pharmacy. We're open seven days a week with extended hours to make it easy to fit vaccination into a busy schedule. Bring your BC Services Card if you have one, and wear a short-sleeved shirt.

If you have questions about whether the flu shot is right for you, talk to one of our pharmacists. We're happy to walk through your specific situation, including timing around other vaccines or medications.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-09-18",
    tags: ["flu shot", "vaccination", "Abbotsford", "seasonal"],
    imageUrl: "/blog/post-2.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 4,
    category: "Vaccinations",
  },

  {
    id: "post-003",
    title: "Understanding Your BC Pharmacare Coverage in 2026",
    slug: "bc-pharmacare-coverage-2026",
    excerpt: "Fair PharmaCare, Plan D, and private insurance can work together. Here's how Abbotsford residents can lower their out-of-pocket medication costs.",
    content: `If you take prescription medications regularly and live in BC, you probably have access to at least one drug coverage program — and you may be leaving money on the table by not using it. BC's pharmacare system has several layers, and understanding how they fit together can save you hundreds or even thousands of dollars a year.

## The basics of BC Pharmacare

BC Pharmacare is the provincial program that helps residents pay for prescription medications, some medical supplies, and certain pharmacy services. It's funded by the Ministry of Health and administered through PharmaCare, which sets the rules for what is covered and at what cost to the patient.

Most BC residents are automatically registered for Fair PharmaCare when they enroll in the Medical Services Plan (MSP). Fair PharmaCare is income-based: the less you earn, the more the province helps with prescription costs. Your deductible and co-payment are calculated based on your net income from two years prior.

If you registered with Fair PharmaCare for the first time, you may not have received a confirmation. That's normal. Coverage begins automatically when you fill a prescription at a BC pharmacy, and your pharmacist can check your enrolment in real time.

## How Fair PharmaCare works in practice

Fair PharmaCare doesn't have a fixed co-pay. Instead, it works on a sliding scale tied to your family net income.

Here's the simplified version:

- Each year, you pay a deductible based on income (ranging from $0 to several thousand dollars)
- After you meet your deductible, the province covers 70% of eligible costs
- Once you reach your family maximum (also income-based), the province covers 100% of eligible costs for the rest of the calendar year

For a senior with a modest income, the deductible might be as low as $0, meaning Pharmacare starts covering 70% of prescription costs immediately. For a working family with higher income, you might pay a few thousand dollars out of pocket before coverage kicks in.

The key thing to know: your out-of-pocket spending resets every January 1. So if you have a year with high medication costs, plan ahead for the next year's deductible.

## What Fair PharmaCare covers

Fair PharmaCare covers most prescription medications that are listed on the BC formulary. This includes drugs for chronic conditions like:

- High blood pressure and cholesterol
- Diabetes
- Asthma and COPD
- Mental health conditions (antidepressants, antipsychotics, mood stabilizers)
- Thyroid disorders
- Hormone therapy
- Many cancer treatments

It also covers certain medical supplies, like insulin pump supplies and test strips for blood glucose monitoring.

It does not generally cover:

- Over-the-counter medications
- Most vitamins and supplements
- Cosmetic treatments
- Drugs not on the BC formulary (though some can be approved through special authority)

A pharmacist can tell you in seconds whether a specific medication is covered under your plan.

## Other coverage you may have

Fair PharmaCare is designed to be the payer of last resort. That means if you have access to other coverage, it must be billed first. Common sources of additional coverage:

**Extended health benefits through work.** Most BC employers offer extended health plans that include prescription drug coverage. These usually pay 80% to 100% of eligible costs up to a yearly maximum. Submit claims through your insurer or use a pay-direct card at the pharmacy.

**Pacific Blue Cross or other private plans.** If you're retired, self-employed, or covered through a spouse's plan, you may have private coverage with similar reimbursement rates.

**First Nations Health Authority (FNHA).** Status First Nations and Inuit patients have prescription drug coverage through the federal Non-Insured Health Benefits program, with no deductible and no co-pay.

**Income Assistance.** If you receive income assistance or disability assistance through the Ministry of Social Development, your prescriptions are typically covered in full.

## Coordinating multiple plans

When you have more than one coverage, the order matters. We coordinate benefits like this:

1. First, your private plan (if you have one) is billed
2. Then, any remaining cost is submitted to Fair PharmaCare
3. Any leftover balance is your responsibility

For most working-age adults, this coordination happens automatically — your pharmacy submits claims to each payer in sequence. You only pay whatever balance remains.

## How to maximize your coverage

A few practical tips:

**Register your spouse and dependents.** If you have a spouse or children, register them on the same Fair PharmaCare account. Family deductibles and maximums are combined, which usually means your family reaches coverage faster.

**File your taxes.** Fair PharmaCare calculates your deductible based on your reported income. If you didn't file taxes the previous year, your deductible defaults to the maximum, which means you pay more out of pocket.

**Use generics when possible.** BC Pharmacare's formulary pricing is based on the lowest-cost generic equivalent. If you or your doctor requests a brand-name drug when a generic is available, you may have to pay the difference yourself.

**Talk to your pharmacist about special authority.** Some medications not on the regular formulary can be covered through special authority, where your doctor submits a request explaining why you need that specific treatment. Pharmacists can help you identify whether special authority is appropriate for your situation.

**Take advantage of free services.** Pharmacist services like medication reviews, prescription adaptations, and minor ailment consultations are covered by Pharmacare and have no out-of-pocket cost for eligible patients.

## The bottom line

If you have a Fair PharmaCare account but you're not sure what it covers, ask us. We can pull up your coverage details in under a minute and tell you exactly what you'll pay for each prescription. Many people are surprised to learn they're paying more than they need to.

For a deeper review of your coverage and medication costs, book a free medication review with one of our pharmacists. We can help you find savings, switch to covered alternatives where appropriate, and ensure you're getting every benefit you're entitled to.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-10-02",
    tags: ["Pharmacare", "BC", "coverage", "savings"],
    imageUrl: "/blog/post-3.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 6,
    category: "Coverage",
  },

  {
    id: "post-004",
    title: "Compounding Pharmacy: When Custom Medication Makes Sense",
    slug: "compounding-pharmacy-custom-medication",
    excerpt: "Compounded medications let pharmacists prepare custom strengths, dosage forms, and combinations. Here's how it works and when it matters.",
    content: `Most prescriptions are mass-manufactured: the same dose, the same pill, the same formulation for everyone. But sometimes, the standard option doesn't fit. A child who can't swallow tablets. A senior who needs a dose that doesn't exist commercially. A patient allergic to a common dye. A pet that needs human medication in a different strength. That's where compounding comes in.

## What compounding is

Compounding is the art and science of preparing custom medications. A compounding pharmacist starts with individual ingredients — active drug substances, bases, flavorings, preservatives — and combines them into a finished product tailored to a specific patient's needs.

Every pharmacy does some basic compounding. When a pharmacist prepares an antibiotic suspension from a powder, or mixes two creams together, that's compounding. Specialty compounding goes further: preparing medications in unique strengths, dosage forms, or combinations that aren't commercially available.

Compounded medications are not generic versions of brand-name drugs. They are entirely new preparations, made for one patient at a time, based on a prescription that specifies exactly what that patient needs.

## Common reasons for compounding

**Pediatric patients.** Children often need liquid formulations when commercial products are only available as tablets or capsules. Compounding lets us prepare liquids in child-friendly flavors at the exact dose prescribed.

**Seniors with swallowing difficulties.** Some older adults have trouble with pills due to stroke, Parkinson's, dementia, or other conditions. We can prepare medications as liquids, topical gels, or even lollipops to make administration easier.

**Allergies and sensitivities.** Commercial medications often contain dyes, lactose, gluten, or preservatives that some patients can't tolerate. Compounded versions can omit these ingredients entirely.

**Discontinued medications.** Occasionally, a drug is removed from the market but a patient still relies on it. Compounding can recreate the formulation when no commercial alternative exists.

**Unique dosage forms.** Some patients benefit from medications delivered as topical creams, suppositories, troches (lozenges), or nasal sprays rather than oral tablets. Compounding makes these alternatives possible.

**Hormone replacement therapy.** Many patients benefit from bio-identical hormone preparations in specific strength combinations not available commercially.

**Veterinary medicine.** Pets often need human medications in different doses or flavors. Compounding lets us prepare cat, dog, or horse-friendly formulations.

## The compounding process

When a doctor writes a prescription for a compounded medication, here's what happens:

1. **Review.** The pharmacist reviews the prescription for safety, drug interactions, and appropriateness. We check the dose, the route of administration, and the patient's medical history.

2. **Formulation.** We design a preparation specific to the patient. This includes selecting the right base (lotion, cream, syrup, capsule shell), appropriate preservatives, and flavorings where applicable.

3. **Preparation.** Using precision equipment — balances, mortars, mixers, ointment slabs — the pharmacist compounds the medication in a dedicated compounding area. Quality is checked at each step.

4. **Verification.** A second pharmacist verifies the final product against the prescription to confirm accuracy.

5. **Counseling.** When the patient picks up, the pharmacist explains how to use the medication, how to store it, and what side effects to watch for.

## What compounded medications are not

Compounded medications are not "natural" or "alternative" therapies. They contain the same active pharmaceutical ingredients as commercial drugs, prepared in custom formulations. They are real medicine, made by licensed professionals following strict protocols.

Compounded medications are also not approved by Health Canada in the same way commercial drugs are. Health Canada approves the active ingredients and sets quality standards for compounding pharmacies, but it does not evaluate each individual compounded preparation the way it evaluates mass-produced drugs. This is why compounded medications are typically prescribed when a commercial alternative isn't suitable, not as a first-line option.

## Quality and safety

Reputable compounding pharmacies follow strict quality standards. Key things to look for:

- The pharmacy should be licensed by the BC College of Pharmacists
- Compounders should have specialized training beyond their pharmacy degree
- Ingredients should be sourced from Health Canada-licensed suppliers
- The compounding area should be separate from regular dispensing with appropriate equipment
- Pharmacists should be available to answer questions about the preparation

At iHealth Pharmacy, our compounding service meets NAPRA (National Association of Pharmacy Regulatory Authorities) standards. We use pharmaceutical-grade ingredients and dedicated equipment to ensure quality and consistency.

## When to ask about compounding

If you're in any of these situations, it might be worth asking your doctor or pharmacist whether a compounded version of your medication would help:

- You're struggling to take a medication in its commercial form
- You're allergic to an inactive ingredient in your current prescription
- Your prescribed dose isn't commercially available
- You've been told you need to stop a medication that was discontinued
- Your child or pet needs a human medication in a different form

## How to get a compounded prescription

If you think compounding might help, the first step is a conversation. You can:

- Ask your doctor to write a compounded prescription
- Call us to discuss whether compounding is appropriate for your situation
- Book a consultation with one of our pharmacists to review your current medications and identify candidates for compounding

Most compounded medications are partially or fully covered by BC Pharmacare and private insurance plans. We can verify your coverage before preparing the prescription so you know what to expect.

Compounding isn't right for every patient or every medication, but when it's needed, it can make a real difference. We prepare medications that fit your life, not the other way around.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-10-16",
    tags: ["compounding", "custom medication", "pediatric", "seniors"],
    imageUrl: "/blog/post-4.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 5,
    category: "Services",
  },

  {
    id: "post-005",
    title: "Managing Multiple Medications: A Guide for Seniors in Abbotsford",
    slug: "managing-multiple-medications-seniors",
    excerpt: "If you take five or more daily medications, organization is everything. Here's how to stay on track and avoid common pitfalls.",
    content: `If you're a senior in Abbotsford taking multiple daily medications, you're not alone. Over 60% of Canadian seniors take five or more prescription medications, and many also use over-the-counter drugs, vitamins, and supplements on top of that. Managing all of it well takes some thought — but with the right systems, it becomes second nature.

## Why medication management matters more with age

A few reasons this gets harder as we get older:

- More prescriptions. Age brings more chronic conditions, each with its own medication.
- Changes in how the body processes drugs. Kidney and liver function naturally decline, making some drugs more potent or longer-lasting.
- More complex regimens. Some seniors take medications at different times of day, with or without food, or with specific spacing between doses.
- Memory and vision challenges. Reading small labels, remembering which pill is which, and recalling whether you took your morning dose are real issues for many people.
- Higher stakes. A missed dose, an accidental double dose, or a drug interaction can have serious consequences in older adults.

The good news: small changes in how you organize and manage medications can dramatically reduce the risk of problems.

## Get a pharmacist review

The single most valuable thing you can do is book a free medication review with a pharmacist. In BC, anyone taking three or more chronic medications is eligible for an annual medication review paid for by Pharmacare. There's no cost to you.

During a medication review, a pharmacist will:

- Go through every medication you take, including prescriptions, OTCs, and supplements
- Check for drug interactions, duplications, and side effects
- Identify medications that may no longer be needed
- Simplify your regimen where possible (combining pills, switching to once-daily dosing, etc.)
- Make sure you understand what each medication does and how to take it
- Send a summary to your doctor if any changes are recommended

Many seniors are surprised to learn they can stop a medication they no longer need, or switch to a safer alternative. Even small simplifications — like moving from four daily doses to two — make a big difference over months and years.

## Compliance packaging: MyHealthPack

If you take several medications a day, blister packaging (we call it MyHealthPack) can be a lifesaver. Here's how it works:

- We sort your medications into a blister card organized by day and time
- Each blister contains the pills you need to take at that moment
- You can see at a glance whether you've taken your morning dose
- We refill the card automatically each week or two weeks

For seniors with arthritis, memory challenges, or vision issues, blister packaging removes most of the cognitive load of medication management. Family members and caregivers can also check at a glance whether medications have been taken.

MyHealthPack is free for most BC residents. If you're on multiple chronic medications, ask us about getting set up.

## Practical organization tips

Beyond blister packaging, a few habits that help:

**Keep an updated medication list.** Write down every medication you take, including the dose, the time of day, and what it's for. Include OTCs and supplements. Keep a copy in your wallet, on your fridge, and with a trusted family member. Bring it to every doctor's appointment and pharmacy visit.

**Use one pharmacy for all your prescriptions.** This isn't about loyalty — it's about safety. When all your prescriptions are at one pharmacy, we can check for interactions every time a new medication is added. Different pharmacies can't see each other's records.

**Set up refill synchronization.** If you take multiple medications, ask us to align your refill dates. Instead of running out of different pills on different days, everything is ready on the same date each month. One trip, one conversation, less stress.

**Build routines around existing habits.** Pair medications with things you already do — brushing your teeth, eating breakfast, watching the evening news. The more automatic it feels, the less likely you'll forget.

**Use pill organizers as a backup.** Even with blister packaging, a weekly pill organizer is useful for things like vitamins or "as needed" medications that don't fit neatly into blister cards.

**Keep medications visible and accessible.** If you have to dig through a drawer to find your morning pills, you're more likely to skip them. Store them somewhere you'll see them, but out of reach of children and pets.

## Watch for these warning signs

Some side effects and interactions are more common in older adults. Watch for:

- Dizziness or unsteadiness, especially when standing up
- Confusion or memory changes that are new
- Unusual fatigue or sleepiness
- Loss of appetite or unexplained weight loss
- Falls, even minor ones
- New digestive issues (constipation, nausea, diarrhea)

These can all be medication-related. If you notice any of them, especially if they started after a new prescription or a dose change, contact your pharmacist or doctor. Don't stop a medication on your own without talking to a healthcare provider first — some drugs need to be tapered to be safe.

## Working with your pharmacist and doctor

Your healthcare team can only help if they know what's happening. A few things that make a real difference:

- Report side effects promptly. We can often adjust the dose, switch to an alternative, or suggest ways to manage the side effect.
- Mention any OTC drugs or supplements you're taking. Even "natural" products can interact with prescriptions.
- Ask questions. If you're not sure why you're taking something or how to take it, ask. There's no such thing as a stupid medication question.
- Tell us about changes in your life. New diagnoses, new doctors, hospital stays, or changes in your living situation can all affect your medication needs.

## Abbotsford-specific resources

If you're a senior in Abbotsford, a few local resources that can help:

- **iHealth Pharmacy medication reviews.** Free, no appointment needed. We can review everything you take and suggest improvements.
- **MyHealthPack blister packaging.** Free for most patients. We sort your pills by day and time so you never have to think about it.
- **Free delivery in Abbotsford.** If getting to the pharmacy is a barrier, we deliver prescriptions to your door at no charge.
- **Home visits.** For seniors with mobility challenges, our pharmacists can visit your home for medication consultations. Talk to us about arranging this.

Managing multiple medications doesn't have to be overwhelming. With the right support and a few simple systems, you can take your medications safely and confidently, and spend less time worrying about them.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-10-30",
    tags: ["seniors", "medication management", "compliance packaging"],
    imageUrl: "/blog/post-5.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 6,
    category: "Seniors",
  },

  {
    id: "post-006",
    title: "Travel Vaccinations: What You Need Before Flying from Abbotsford",
    slug: "travel-vaccinations-abbotsford",
    excerpt: "Planning a trip abroad? Some countries require specific vaccines before you enter. Here's how to prepare for travel from YVR or YXX.",
    content: `Whether you're heading to Mexico for a beach vacation, visiting family in India, or taking a business trip to East Africa, travel vaccines are one of those things you don't want to think about the week before departure. Some require multiple doses spread over weeks. Some need to be given at specific intervals before travel. And a few destinations will literally turn you away at the border if your records aren't in order.

Here's what Abbotsford travelers need to know about travel vaccinations.

## Six to eight weeks before travel

The sweet spot for most travel vaccines is six to eight weeks before departure. This is enough time to:

- Complete multi-dose vaccine series (hepatitis A and B, Japanese encephalitis, rabies)
- Allow your immune system to build full protection (most vaccines take two weeks to reach peak effectiveness)
- Address any unexpected issues, like shortages or special authority requirements

If you're traveling in less than four weeks, it's still worth coming in. Some vaccines can be given on accelerated schedules, and partial protection is better than none. We'll work with whatever timeline you have.

## Common travel vaccines

The vaccines you need depend on where you're going, what you're doing, and your own health history. Some of the most common:

**Hepatitis A.** Recommended for most international travel, especially to developing countries. Two doses, six months apart, but even one dose provides solid protection for a single trip.

**Hepatitis B.** Recommended for longer-term travel, healthcare workers, and people who might have medical procedures abroad. Three-dose series.

**Typhoid.** Recommended for travel to South Asia, parts of Africa, and some regions of Central and South America. Single dose, taken at least two weeks before travel.

**Yellow fever.** Required for entry to many countries in sub-Saharan Africa and parts of South America. Some countries require proof of vaccination at least 10 days before arrival. We are an authorized yellow fever vaccination center and provide the International Certificate of Vaccination (the "yellow card") required for entry.

**Japanese encephalitis.** Recommended for travel to rural parts of Southeast Asia, especially during transmission season. Two doses, 28 days apart.

**Rabies.** Recommended for travel to areas where rabies is common and medical care may be limited (parts of Asia, Africa, and Central/South America). Three-dose series over 21 to 28 days.

**Meningococcal.** Required for entry to Saudi Arabia during Hajj and recommended for travel to the "meningitis belt" of sub-Saharan Africa.

**Cholera.** Occasionally recommended for humanitarian workers or travelers to areas with active outbreaks.

**Tetanus, diphtheria, pertussis.** Make sure you're up to date before any international travel.

**Influenza and COVID-19.** Recommended year-round, especially during northern hemisphere winter (which is southern hemisphere summer at your destination).

## What about malaria?

Malaria isn't a vaccine — it's a daily or weekly pill you take before, during, and after travel to at-risk regions. A pharmacist can prescribe antimalarial medications after a brief travel consultation.

Common antimalarials include:

- Atovaquone-proguanil (Malarone) — once daily, well-tolerated, expensive
- Doxycycline — once daily, inexpensive, can cause sun sensitivity
- Mefloquine (Lariam) — weekly, but more side effects
- Chloroquine — weekly, but resistance is widespread

The right choice depends on your destination, duration of travel, medical history, and budget. We'll discuss the options and help you decide.

## Traveler's diarrhea kit

Most travel medicine consultations also cover what to do if you get sick abroad. A good travel kit for most destinations includes:

- Oral rehydration salts
- Loperamide (Imodium) for symptomatic relief
- Antibiotics (azithromycin is the usual choice for Southeast Asia; ciprofloxacin for other regions) — a pharmacist can prescribe these
- Probiotics

For high-altitude travel, talk to us about acetazolamide (Diamox) for altitude sickness prevention.

## Travel health consultation

Before you travel, book a travel health consultation. This is a more detailed conversation than a regular vaccine appointment. We cover:

- Destination-specific risks and required vaccines
- Malaria prevention if applicable
- Food and water safety
- Insect bite prevention
- Traveler's diarrhea
- Altitude sickness if relevant
- Personal medical history and current medications
- Insurance coverage for travel health

Bring your itinerary (including layovers and side trips), your vaccination records, and a list of your current medications. If you have specific concerns — pregnancy, immunocompromise, chronic illness — mention these when you book so we can prepare.

## Country-specific requirements

A few important things to know:

- **Yellow fever:** Some countries require proof of yellow fever vaccination if you're arriving from a country with risk of transmission, even if that country is just a layover. Check requirements carefully for itineraries with connections.
- **Polio:** Some countries require proof of polio vaccination if you're arriving from a country with active transmission.
- **COVID-19:** Requirements change frequently. Check the Government of Canada travel advisory page closer to your departure date.
- **Meningococcal ACWY:** Required for entry to Saudi Arabia during Hajj and Umrah.

The Government of Canada publishes detailed travel health notices and country-specific advisories at travel.gc.ca. We use this as a reference but always cross-check with current recommendations.

## Costs

Travel vaccines are generally not covered by BC Pharmacare. Costs vary:

- Hepatitis A: ~$50 per dose
- Hepatitis B: ~$25 per dose
- Typhoid: ~$45
- Yellow fever: ~$150 (includes certificate)
- Japanese encephalitis: ~$200 per dose
- Rabies: ~$200 per dose
- Meningococcal: ~$100

Some extended health plans cover travel vaccines — check yours. We can provide a detailed receipt for insurance submission.

## Book early

If you have international travel on the horizon, the best time to book your travel health consultation is now. We can usually accommodate you within a week, and having enough lead time for multi-dose vaccines saves a lot of stress later.

Stop by the pharmacy or call to book a travel consultation. Bring your itinerary and we'll handle the rest.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-11-06",
    tags: ["travel", "vaccinations", "international travel"],
    imageUrl: "/blog/post-6.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 6,
    category: "Vaccinations",
  },

  {
    id: "post-007",
    title: "MyHealthPack: Simplifying Daily Medications for Busy Abbotsford Families",
    slug: "myhealthpack-compliance-packaging",
    excerpt: "If you're juggling prescriptions for multiple family members, compliance packaging takes the mental load off. Here's how it works.",
    content: `Most of us don't think twice about taking a pill or two. But when you're managing prescriptions for yourself, your partner, and maybe an aging parent — and several of those prescriptions involve multiple daily doses — the math gets complicated fast. Did Dad take his evening dose? Is the white one in the morning or at night? Did we already give the antibiotic today?

Compliance packaging, which we call MyHealthPack at iHealth Pharmacy, removes almost all of that confusion. Here's how it works and why so many Abbotsford families rely on it.

## What MyHealthPack is

MyHealthPack is a service where we organize your medications into a custom blister card. The card has rows and columns:

- Rows are days of the week (one row per day)
- Columns are times of day (morning, noon, evening, bedtime, as needed)
- Each blister contains every pill you need to take at that specific time

When it's Monday morning, you tear off the Monday row, pop out the morning dose, and take it. That's it. You don't have to think about which pill is which, which goes with food, or whether you took your dose already. It's all right there.

## Who uses it

We set up MyHealthPack for a wide range of patients:

**Seniors managing multiple medications.** Probably our most common group. The cognitive load of organizing five or ten pills a day, four times a day, is overwhelming for many older adults. Blister packaging makes the whole thing visual and simple.

**People with memory or cognitive challenges.** Patients with early dementia, brain injury, or other cognitive conditions benefit enormously. Family members can also check at a glance whether doses have been taken.

**Busy working adults.** If you're rushing out the door at 7am and coming home at 7pm, the last thing you need is to figure out which pills go in your work bag and which go on the dinner table. Pre-packaged doses simplify the routine.

**Parents of children with chronic conditions.** Some kids need multiple daily medications for asthma, ADHD, allergies, or other conditions. Compliance packaging makes it easier for parents, babysitters, and school staff to administer correctly.

**Anyone who wants to simplify.** Even patients with relatively simple regimens appreciate the visual reminder and convenience.

## How it works

Getting started with MyHealthPack is straightforward:

**Step 1: Medication review.** Before we package anything, a pharmacist reviews your full medication list. We check for interactions, duplications, and ways to simplify. If we spot anything concerning, we contact your doctor before proceeding.

**Step 2: Setup.** Once everything is verified, we set up your packaging schedule. Most people use a one-week or two-week cycle. We align all your medications to the same refill date so you're not running out at different times.

**Step 3: First fill.** We prepare your first blister card and walk you through how to use it. You'll know exactly what each row and column means and how to handle "as needed" medications that don't fit in the regular slots.

**Step 4: Ongoing refills.** Each time you need a refill, we prepare your next card automatically. You get a text or call when it's ready, and you pick it up or we deliver it.

## What goes in the pack

MyHealthPack can include:

- All prescription medications taken on a regular schedule
- Vitamins and supplements taken daily (we can add these too)
- Over-the-counter medications taken at specific times

Medications that don't fit nicely in blister packaging:

- "As needed" medications (we keep these as separate prescriptions)
- Medications that need to be stored in special conditions (some liquids, certain injections)
- Medications that change frequently (e.g., antibiotics during a short course)

We work around these by keeping them as separate fills alongside your MyHealthPack card.

## Free delivery in Abbotsford

Picking up a blister card every week or two is straightforward, but for many families it's an inconvenience. We offer free prescription delivery anywhere in Abbotsford for orders over $25. We'll bring your MyHealthPack card straight to your door — and if you have questions, the delivery driver can connect you with a pharmacist by phone.

## Safety benefits

Beyond convenience, compliance packaging has real safety advantages:

**Fewer missed doses.** Studies show blister packaging improves adherence by 20-30% in patients with chronic conditions. Visual cues make it obvious when a dose has been missed.

**Fewer double doses.** Without organization, it's easy to forget you already took your morning pill and take it again. With blister packaging, an empty blister is a clear signal.

**Fewer errors.** Mixing up pills is more common than people admit, especially in low-light conditions or when you're tired. The pharmacist sorts everything for you.

**Easier to detect problems.** If you notice medications building up in a row that should be empty, that's a signal that something's off — either the dose, the timing, or the patient's condition. Family members and caregivers can spot this at a glance.

## Coverage and costs

For most BC patients on multiple chronic medications, MyHealthPack is fully covered by BC Pharmacare. There may be a small dispensing fee per fill, similar to any prescription fill. We can confirm your coverage before you start.

For patients not covered by Pharmacare for this service, we charge a small packaging fee on top of the usual dispensing fee. The fee is modest and saves a lot of hassle. We'll always tell you upfront what it costs.

## Getting started

If you think MyHealthPack might help you or someone in your family, the easiest way to start is a quick conversation. Bring your current medication list (or have it on file at our pharmacy) and we'll review the situation.

For seniors and patients with complex regimens, we typically schedule a 30-minute medication review first to make sure everything is optimized before we begin packaging. For simpler cases, we can usually start packaging within a few days.

Compliance packaging is one of those services that, once you start, you wonder how you ever managed without it. If you're ready to simplify your medication routine, talk to us.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-11-20",
    tags: ["MyHealthPack", "compliance packaging", "medication management"],
    imageUrl: "/blog/post-7.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 5,
    category: "Services",
  },

  {
    id: "post-008",
    title: "Minor Ailments: 7 Conditions Your Abbotsford Pharmacist Can Now Prescribe For",
    slug: "minor-ailments-pharmacist-prescribing",
    excerpt: "Since 2023, BC pharmacists can assess and prescribe for many common conditions. Skip the doctor's wait for these everyday issues.",
    content: `A few years ago, getting treatment for a urinary tract infection, pink eye, or cold sore meant booking a doctor's appointment, sitting in a waiting room, and paying a visit fee — even though the diagnosis is often straightforward and the treatment is well-established. That's no longer the only path.

Since 2023, BC pharmacists can independently assess and prescribe for a growing list of minor ailments. For Abbotsford residents, this means faster access to treatment for everyday health issues — often without leaving the pharmacy.

## How pharmacist prescribing works

When you come in with one of these conditions, the pharmacist will:

1. Ask questions about your symptoms and medical history
2. Perform a brief assessment (which may include checking your temperature, blood pressure, or other basic checks)
3. Confirm the condition falls within the pharmacist prescribing scope
4. Prescribe an appropriate treatment if indicated
5. Provide counseling on how to take the medication and what to watch for
6. Refer you to a doctor if the condition is more serious than initially appeared

The whole process usually takes 15 to 30 minutes. You walk out with a prescription in hand.

## The 7 conditions pharmacists commonly prescribe for

### 1. Urinary tract infections (uncomplicated)

If you've had a UTI before, you know the symptoms: burning when you urinating, frequent urge to go, cloudy or strong-smelling urine. For women with a confirmed history of UTIs and no complicating factors, pharmacists can test your urine and prescribe antibiotics on the spot.

We can also recommend over-the-counter pain relief and strategies to prevent recurrence.

### 2. Pink eye (conjunctivitis)

Pink, itchy, watery eyes with sticky discharge are usually conjunctivitis. Pharmacists can assess whether it's viral, bacterial, or allergic and prescribe antibiotic eye drops if appropriate. Most cases resolve within a week.

### 3. Cold sores

If you get cold sores and recognize the early tingling sensation, a pharmacist can prescribe antiviral creams or oral medication. Starting treatment early shortens the duration.

### 4. Shingles

For shingles within 72 hours of rash onset, antiviral medications significantly reduce severity and duration. Pharmacists can prescribe and start treatment quickly, which is critical because the early window matters most.

### 5. Strep throat (adults)

A quick throat swab in the pharmacy can confirm strep, and if positive, the pharmacist can prescribe antibiotics. Untreated strep can lead to complications, so getting treatment quickly is important.

### 6. Mild acne

For mild to moderate acne, pharmacists can prescribe topical retinoids, benzoyl peroxide combinations, and other treatments. We'll also coach you on a skincare routine.

### 7. Allergic rhinitis (hay fever)

If seasonal or year-round allergies are getting the better of you, pharmacists can prescribe antihistamines, nasal sprays, and combination treatments.

## Other conditions pharmacists can assess

Beyond these seven, BC pharmacists can also help with:

- **Cold and flu symptoms** (assessment, supportive treatment, and prescribing antivirals like oseltamivir when appropriate)
- **Gastroesophageal reflux disease (GERD)** — short-term management
- **Hemorrhoids** — topical and supportive treatment
- **Insect bites and stings** — for uncomplicated reactions
- **Tick bites** (post-exposure prophylaxis for Lyme disease)
- **Travel-related conditions** like traveler's diarrhea and malaria prevention
- **Smoking cessation** — prescribing nicotine replacement therapy and other supports

The list continues to expand as the BC government extends prescribing authority.

## When you still need a doctor

Some situations aren't appropriate for pharmacist prescribing. We refer patients to a doctor or nurse practitioner when:

- Symptoms suggest a more serious condition
- The patient is very young, pregnant, or has complex medical history
- First-time presentation (we want a doctor to evaluate something new)
- The condition doesn't respond to initial treatment
- Symptoms worsen after a few days

If we can't help, we'll tell you upfront and help you find the right next step — whether that's a same-day clinic, your family doctor, or urgent care.

## What it costs

Most BC Pharmacare plans cover pharmacist prescribing services with no out-of-pocket cost to the patient. The prescribed medication itself is covered the same way any prescription would be.

For patients without Pharmacare coverage, there may be a small fee for the assessment. The cost of the medication depends on the drug. We'll always tell you what to expect before we start.

## Why this matters

Pharmacist prescribing isn't about replacing doctors. It's about matching the right professional to the right level of care. For straightforward, well-defined conditions, a pharmacist is the appropriate clinician. This frees up doctors to focus on complex cases while making sure patients get timely treatment.

For Abbotsford residents, it also means not having to wait days for an appointment when you have something that needs attention now.

## What to bring

For your visit, bring:

- Your BC Services Card
- A list of your current medications (or your medication profile if you're a regular at our pharmacy)
- Information about any allergies or past reactions to medications
- A description of when your symptoms started and how they've progressed

If you're not sure whether your condition falls under pharmacist prescribing, just call us. We'll tell you quickly whether we can help or whether you need a doctor.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-12-04",
    tags: ["minor ailments", "pharmacist prescribing", "BC healthcare"],
    imageUrl: "/blog/post-8.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 5,
    category: "Services",
  },

  {
    id: "post-009",
    title: "Free Prescription Delivery in Abbotsford: How It Works",
    slug: "free-prescription-delivery-abbotsford",
    excerpt: "If getting to the pharmacy is a barrier, we bring your prescriptions to you. Here's how our free Abbotsford delivery service works.",
    content: `Sometimes the hardest part of managing your medications isn't the medication itself — it's getting to the pharmacy. Maybe your mobility is limited. Maybe you're juggling work and kids. Maybe you're recovering from surgery. Maybe you just don't feel like driving across town.

That's exactly why we offer free prescription delivery in Abbotsford. Same-day for most orders, no charge, straight to your door.

## Who qualifies for free delivery

Free delivery applies to anyone in Abbotsford with a prescription order totaling $25 or more. The threshold is intentionally low — it covers most prescription fills. If you're picking up a single refill that costs less than $25, we'll still deliver it; we just have a small $5 delivery fee in that case.

There's no minimum for seniors, patients with mobility challenges, or anyone enrolled in our auto-refill program. We want to make medication access easy for everyone.

## How to request delivery

There are a few ways:

- **In person.** When you drop off a prescription or pick up a refill, ask for delivery.
- **By phone.** Call us and request delivery for your next refill.
- **Online.** Use the request form on our website.
- **Through your doctor.** Many Abbotsford doctors can send prescriptions directly to us electronically — we get them in real time, and you can request delivery when we confirm receipt.

If you're already enrolled in our auto-refill program, delivery is the default — we just bring it to you when it's ready.

## What areas we cover

We deliver anywhere in Abbotsford:

- Central Abbotsford
- Abbotsford East and West
- McMillan, Clearbrook, and the surrounding neighborhoods
- Areas near UFV
- Most rural routes within Abbotsford city limits

If you're just outside city limits, give us a call and we'll let you know if we can reach you. For most addresses in the Fraser Valley within a 15-minute drive, we're able to deliver.

## Same-day delivery cutoff

For same-day delivery, request your prescription by 2pm on weekdays. Orders placed after 2pm typically deliver the next business day. Saturday delivery is available for orders placed before noon.

If you need urgent medication outside these windows, call us directly. We have arrangements for urgent cases and will do our best to accommodate.

## How the delivery works

A few things to know:

**Discreet packaging.** Your medications arrive in plain, unmarked packaging. The delivery driver doesn't share information about what's inside.

**Identity verification.** For controlled substances and certain prescriptions, the driver will ask for ID at the door. For most regular prescriptions, no signature is required — but the driver will confirm your name and address.

**No-contact delivery.** If you'd prefer, we can leave your delivery at your door without contact. Just let us know when you request.

**Temperature-sensitive medications.** Insulin and some other medications need refrigeration. We use insulated bags and ice packs when needed to maintain temperature during transport.

**Counseling available.** If you have questions about your medication, the driver can connect you with a pharmacist by phone. For complex questions, we'll arrange a follow-up call from a pharmacist later the same day.

## Combining delivery with other services

Delivery is one part of a broader medication management service. You can combine it with:

- **MyHealthPack compliance packaging.** We deliver your pre-sorted blister card.
- **Auto-refill.** We refill your prescriptions automatically and deliver when ready.
- **Medication reviews.** We deliver your medications and conduct a phone or in-home medication review at the same time.
- **Transfer from another pharmacy.** We transfer all your prescriptions, then deliver them once they're ready.

## When in-person pickup makes more sense

Delivery isn't always the best option. You might prefer to pick up in person if:

- You want to ask the pharmacist questions face-to-face
- You're picking up a medication that requires first-time counseling
- You're also shopping for OTC items we carry
- You just want to stretch your legs

Our in-pharmacy experience is unhurried, and pharmacists are available to talk without an appointment. If you're in Abbotsford and able to come by, we're always happy to see you.

## For caregivers and family members

If you're picking up or managing prescriptions for a family member, you can authorize us to deliver to their address and coordinate payment. We just need:

- Their name and date of birth (to identify the patient)
- Their address (for delivery)
- Your contact information (for any delivery issues)
- Authorization to bill their insurance or their preferred payment method

If you want someone else to be able to pick up or receive delivery on your behalf, just let us know — we'll add them to your profile.

## Getting started

If you've never used our delivery service before, the first step is a one-time setup. We'll collect:

- Your contact information
- Your delivery address (and a backup if applicable)
- Delivery preferences (door drop vs. handoff, contact number)
- Payment method or insurance details

After that, you can request delivery with each refill. Most patients find that once they've tried it, they rarely come in person unless they need to.

For Abbotsford residents who have been putting off refills because getting to the pharmacy is a barrier, free delivery is the easiest way to stay on track. Give us a call or stop in next time you're nearby, and we'll get you set up.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-12-12",
    tags: ["delivery", "Abbotsford", "convenience"],
    imageUrl: "/blog/post-9.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 5,
    category: "Services",
  },

  {
    id: "post-010",
    title: "COVID-19 Boosters Fall 2026: Updated Guidance for Fraser Valley Residents",
    slug: "covid-boosters-fall-2026",
    excerpt: "Updated COVID-19 vaccines target new variants. Here's who should get boosted this fall and what to expect.",
    content: `COVID-19 hasn't gone away. The virus continues to evolve, and updated vaccines are released each year to match circulating strains. For Abbotsford residents wondering whether to get another booster this fall, here's the current guidance.

## Who should get a fall 2026 booster

The updated 2026–2027 COVID-19 vaccines are recommended for:

- Adults 65 and older (highest priority — boosters every 6 to 12 months)
- Adults with chronic medical conditions, including heart disease, lung disease, diabetes, kidney disease, liver disease, cancer, immunocompromise, obesity, or pregnancy
- Residents of long-term care and assisted living facilities
- People from communities disproportionately affected by COVID-19
- Healthcare workers and first responders
- Adults who have never been vaccinated against COVID-19

For healthy adults aged 18 to 64 who are not in a high-risk group, the recommendation is more nuanced. A fall 2026 booster is reasonable, particularly if you haven't had a dose or infection in the past 12 months, but it's not as urgent as it is for higher-risk groups.

Children aged 6 months to 17 years who are at high risk or who have never been vaccinated are also eligible. Otherwise, healthy children's vaccination is at parental discretion and based on shared decision-making with a healthcare provider.

## What's different about this year's vaccine

The fall 2026 vaccines are updated to target the SARS-CoV-2 subvariants currently in circulation, including descendants of the JN.1 lineage and emerging variants. The updates are similar in spirit to how flu vaccines are reformulated each year — to better match the virus as it evolves.

The two vaccines available in Canada this fall are:

- **mRNA vaccine (Pfizer-BioNTech Comirnaty and Moderna Spikevax)** — the most widely used platform
- **Protein subunit vaccine (Novavax Nuvaxovid)** — an alternative for those who can't or prefer not to take mRNA vaccines

Both are expected to be available in BC pharmacies by mid-fall.

## Timing

For most people, the optimal timing for a fall booster is October through November, ahead of the winter respiratory illness season. This gives your immune system time to build protection before the usual December-February peak.

If you've recently had a COVID-19 infection, you can wait 3 to 6 months before getting another dose, since recent infection provides some temporary protection. Talk to a pharmacist about the best timing for your specific situation.

## What about co-administration with the flu shot?

Yes, you can get the COVID-19 booster and the flu shot at the same visit. This is the standard recommendation from public health authorities. It saves a trip and gets both vaccines into your system when they need to be.

If you're also due for an RSV vaccine (for adults 60+ or pregnant people), that can usually be given at the same visit too, though your pharmacist can help decide the best timing for each.

## What to expect

The updated COVID-19 vaccines have similar side effect profiles to earlier versions:

- **Common:** Sore arm, fatigue, mild headache, low-grade fever for 1-2 days
- **Less common:** Body aches, chills, swollen lymph nodes
- **Rare:** Allergic reactions (we monitor for 15 minutes post-vaccination)

Serious side effects remain very rare. The mRNA vaccines have been administered billions of times worldwide with an excellent safety record.

## Booking your booster

Walk-in COVID-19 boosters are available at iHealth Pharmacy during regular business hours. No appointment needed, though you can book ahead if you prefer.

Bring your BC Services Card. If you've been vaccinated outside of BC, bring your records so we can update your profile. Most appointments take about 15 minutes including the post-vaccination observation period.

## Treating COVID-19 if you get sick

Even with vaccination, breakthrough infections happen. If you test positive for COVID-19 and you're at high risk for severe disease, antiviral medications like Paxlovid can reduce the severity and duration of illness. The key is starting treatment within 5 days of symptom onset.

Pharmacists in BC can now assess and prescribe Paxlovid directly for eligible patients. If you test positive, contact us as soon as possible — we can often arrange same-day assessment and treatment.

Eligibility for Paxlovid includes:

- Adults 65 and older, regardless of vaccination status
- Adults 18+ with chronic medical conditions (diabetes, heart disease, lung disease, immunocompromise, etc.)
- Adults 18+ who are unvaccinated or haven't had COVID-19 before

If you have COVID-19 symptoms and want to know whether Paxlovid is right for you, call us. We'll ask a few questions and let you know.

## Staying healthy this winter

Beyond vaccines, the basics still work:

- Stay home when sick
- Wash hands frequently
- Consider wearing a mask in crowded indoor settings if you're at high risk
- Test if you have symptoms, especially before visiting vulnerable family members
- Keep your regular medications refilled — don't wait until you're out

iHealth Pharmacy is here to help with all of it, from vaccines to prescriptions to advice when you're not sure what to do. We've been part of the Abbotsford community through every phase of the pandemic and we're committed to keeping our neighbors healthy through this winter and beyond.

If you have questions about COVID-19 vaccines or treatment, talk to one of our pharmacists. We can help you make an informed decision based on your personal health situation.`,
    author: "The iHealth Pharmacy Team",
    publishedAt: "2026-09-25",
    tags: ["COVID-19", "booster", "vaccination", "fall 2026"],
    imageUrl: "/blog/post-10.jpg",
    status: "published",
    themeUsed: "default",
    readTimeMinutes: 5,
    category: "Vaccinations",
  },
];

// Quick stats helper for verification
export const MKT_01_STATS = {
  total: MKT_01_POSTS.length,
  totalWords: MKT_01_POSTS.reduce((sum, p) => sum + p.content.split(/\s+/).length, 0),
  averageReadTime: Math.round(
    MKT_01_POSTS.reduce((sum, p) => sum + p.readTimeMinutes, 0) / MKT_01_POSTS.length
  ),
};
