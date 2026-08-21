# Practice Buddy — Complete Curriculum Seed Plan

## Overview

This document specifies the full curriculum seed for Practice Buddy, covering **6 programs** with **~500+ skills**, **~2,000+ micro-skills**, and **20,000+ gold questions**. The curriculum is designed for Grades 3–10 Core Math & English, MAP Growth (Math & Reading), and SAT (Math & Reading & Writing).

---

## 1. Architecture Summary

### Database Models (Prisma)

```
Program → Grade → Skill → MicroSkill → GoldQuestion → QuestionFamily → Question → QuestionVersion
                                                ↑
                                          StudentAttempt → UserSkillMastery
```

### Key Fields

| Model | Key Fields | Notes |
|-------|-----------|-------|
| **Program** | `code`, `name` | Core, SAT, MAP, ACT, IELTS, TOEFL |
| **Grade** | `programId`, `level`, `label` | Unique per program+level |
| **Skill** | `gradeId`, `code`, `name`, `subject`, `domain`, `category`, `subcategory` | Unique per grade+code |
| **MicroSkill** | `skillId`, `code`, `name`, `learningObjective` | 3 per skill |
| **GoldQuestion** | `subject`, `domain`, `category`, `subcategory`, `difficulty`, `format`, `stem`, `options`, `correctAnswer` | Certified question template |
| **QuestionFamily** | `goldQuestionId`, `name`, `variationCount` | Groups question variations |
| **Question** | `goldQuestionId`, `familyId`, `skillId`, `subject`, `domain`, `stem`, `options` | Published question |
| **QuestionVersion** | `questionId`, `versionNumber`, `stem`, `options`, `correctAnswer` | Versioned content |

### Question Types Supported

| Format | Renderer | Database Value |
|--------|----------|---------------|
| Multiple Choice | `MultipleChoiceRenderer` | `multiple-choice` |
| Multi-Answer Select | (planned) | `multiple-answer` |
| Numeric / Grid-In | `NumericRenderer` | `numeric` |
| Typed Response | `TypedRenderer` | `typed` |
| Fill-in-Blank | (planned) | `fill-in-blank` |
| Matching | (planned) | `matching` |
| Ordering | (planned) | `ordering` |

### Two-Attempt Teaching Flow

```
PracticeState machine:
idle → selected → submitted_a1 → correct_a1 (move on)
                                 → incorrect_a1 → strategy → selected_a2 → submitted_a2 → correct_a2 / incorrect_a2 → complete
```

- **First attempt**: Weighted 2x in mastery calculation
- **Strategy card**: Shown between attempts with hints/approach
- **Second attempt**: Weighted 1x, locks after answer
- **Mastery engine**: `calculateMasteryFromAttempts()` in `src/lib/mastery-engine.ts`

### Mastery Levels

| Level | Threshold | Description |
|-------|-----------|-------------|
| mastered | ≥ 80% | Strong command, periodic review |
| proficient | 60–79% | Functional command, some gaps |
| approaching | 40–59% | Developing, needs practice |
| needs_support | < 40% | Significant gaps |
| not-assessed | 0 attempts | Not yet practiced |

---

## 2. Program Definitions

### Program 1: Core Math (code: `core-math`)
**Grades 3–10** (8 levels), **4 domains**, **20 skills per grade** = **160 skills total**

### Program 2: Core English (code: `core-english`)
**Grades 3–10** (8 levels), **4 domains**, **20 skills per grade** = **160 skills total**

### Program 3: MAP Math (code: `map-math`)
**RIT bands 151–280**, **4 domains**, **skills per RIT band**

### Program 4: MAP Reading (code: `map-reading`)
**RIT bands 151–280**, **4 domains**, **skills per RIT band**

### Program 5: SAT Math (code: `sat-math`)
**4 domains**, **19 skills** (official College Board taxonomy)

### Program 6: SAT Reading & Writing (code: `sat-rw`)
**4 domains**, **12 skills** (official College Board taxonomy)

---

## 3. Core Math — Grades 3–10

### Domains

| Domain | Code | Description |
|--------|------|-------------|
| Operations & Algebraic Thinking | `oa` | Number operations, patterns, expressions |
| Number & Operations – Base Ten / Fractions | `nf` | Place value, decimals, fractions, ratios |
| Measurement & Data / Geometry | `mdg` | Measurement, data, shapes, volume |
| Ratios, Proportions & Algebra | `rpa` | Ratios, rates, equations, functions |

### Grade 3 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g3-math-oa-01 | Multiplication & Division Concepts | Operations & Algebraic Thinking | Multiplication & Division |
| 2 | g3-math-oa-02 | Properties of Multiplication | Operations & Algebraic Thinking | Multiplication & Division |
| 3 | g3-math-oa-03 | Multiplication & Division Word Problems | Operations & Algebraic Thinking | Word Problems |
| 4 | g3-math-oa-04 | Two-Step Word Problems | Operations & Algebraic Thinking | Word Problems |
| 5 | g3-math-oa-05 | Patterns in Arithmetic | Operations & Algebraic Thinking | Patterns |
| 6 | g3-math-nf-01 | Place Value to 10,000 | Number & Operations | Place Value |
| 7 | g3-math-nf-02 | Rounding Numbers | Number & Operations | Place Value |
| 8 | g3-math-nf-03 | Addition & Subtraction within 1,000 | Number & Operations | Operations |
| 9 | g3-math-nf-04 | Understanding Fractions | Number & Operations | Fractions |
| 10 | g3-math-nf-05 | Equivalent Fractions | Number & Operations | Fractions |
| 11 | g3-math-nf-06 | Comparing Fractions | Number & Operations | Fractions |
| 12 | g3-math-mdg-01 | Telling Time & Elapsed Time | Measurement & Data | Time |
| 13 | g3-math-mdg-02 | Mass & Volume Measurement | Measurement & Data | Measurement |
| 14 | g3-math-mdg-03 | Picture Graphs & Bar Graphs | Measurement & Data | Data |
| 15 | g3-math-mdg-04 | Area Concepts | Measurement & Data | Geometry |
| 16 | g3-math-mdg-05 | Perimeter | Measurement & Data | Geometry |
| 17 | g3-math-mdg-06 | Classifying Shapes | Measurement & Data | Geometry |
| 18 | g3-math-rpa-01 | Understanding Unit Fractions | Ratios, Proportions & Algebra | Fractions Foundation |
| 19 | g3-math-rpa-02 | Fractions on a Number Line | Ratios, Proportions & Algebra | Fractions Foundation |
| 20 | g3-math-rpa-03 | Intro to Area as Multiplication | Ratios, Proportions & Algebra | Algebraic Foundations |

### Grade 4 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g4-math-oa-01 | Multiplicative Comparisons | Operations & Algebraic Thinking | Comparisons |
| 2 | g4-math-oa-02 | Multi-Step Word Problems | Operations & Algebraic Thinking | Word Problems |
| 3 | g4-math-oa-03 | Factors & Multiples | Operations & Algebraic Thinking | Number Theory |
| 4 | g4-math-oa-04 | Prime & Composite Numbers | Operations & Algebraic Thinking | Number Theory |
| 5 | g4-math-oa-05 | Number & Shape Patterns | Operations & Algebraic Thinking | Patterns |
| 6 | g4-math-nf-01 | Place Value to 1,000,000 | Number & Operations | Place Value |
| 7 | g4-math-nf-02 | Multi-Digit Addition & Subtraction | Number & Operations | Operations |
| 8 | g4-math-nf-03 | Multi-Digit Multiplication | Number & Operations | Operations |
| 9 | g4-math-nf-04 | Long Division | Number & Operations | Operations |
| 10 | g4-math-nf-05 | Addition & Subtraction of Fractions | Number & Operations | Fractions |
| 11 | g4-math-nf-06 | Multiplying Fractions by Whole Numbers | Number & Operations | Fractions |
| 12 | g4-math-nf-07 | Decimal Notation for Fractions | Number & Operations | Decimals |
| 13 | g4-math-nf-08 | Comparing Decimals | Number & Operations | Decimals |
| 14 | g4-math-mdg-01 | Measurement Conversion | Measurement & Data | Measurement |
| 15 | g4-math-mdg-02 | Area & Perimeter Problems | Measurement & Data | Geometry |
| 16 | g4-math-mdg-03 | Line Plots with Fractions | Measurement & Data | Data |
| 17 | g4-math-mdg-04 | Angles | Measurement & Data | Geometry |
| 18 | g4-math-mdg-05 | Classifying 2D Shapes | Measurement & Data | Geometry |
| 19 | g4-math-mdg-06 | Symmetry | Measurement & Data | Geometry |
| 20 | g4-math-rpa-01 | Equivalent Fractions (Advanced) | Ratios, Proportions & Algebra | Fractions Foundation |

### Grade 5 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g5-math-oa-01 | Order of Operations | Operations & Algebraic Thinking | Expressions |
| 2 | g5-math-oa-02 | Numerical Expressions | Operations & Algebraic Thinking | Expressions |
| 3 | g5-math-oa-03 | Patterns & Relationships | Operations & Algebraic Thinking | Patterns |
| 4 | g5-math-nf-01 | Place Value to Billions | Number & Operations | Place Value |
| 5 | g5-math-nf-02 | Multi-Digit Multiplication (Advanced) | Number & Operations | Operations |
| 6 | g5-math-nf-03 | Multi-Digit Division | Number & Operations | Operations |
| 7 | g5-math-nf-04 | Adding & Subtracting Fractions (Unlike Denominators) | Number & Operations | Fractions |
| 8 | g5-math-nf-05 | Multiplying Fractions | Number & Operations | Fractions |
| 9 | g5-math-nf-06 | Dividing Fractions | Number & Operations | Fractions |
| 10 | g5-math-nf-07 | Fractions as Division | Number & Operations | Fractions |
| 11 | g5-math-nf-08 | Decimal Place Value | Number & Operations | Decimals |
| 12 | g5-math-nf-09 | Operations with Decimals | Number & Operations | Decimals |
| 13 | g5-math-mdg-01 | Measurement Conversions (Customary & Metric) | Measurement & Data | Measurement |
| 14 | g5-math-mdg-02 | Volume Concepts | Measurement & Data | Geometry |
| 15 | g5-math-mdg-03 | Volume of Rectangular Prisms | Measurement & Data | Geometry |
| 16 | g5-math-mdg-04 | Line Plots & Data | Measurement & Data | Data |
| 17 | g5-math-mdg-05 | Coordinate Plane (First Quadrant) | Measurement & Data | Geometry |
| 18 | g5-math-mdg-06 | Classifying 2D Figures | Measurement & Data | Geometry |
| 19 | g5-math-rpa-01 | Understanding Ratios | Ratios, Proportions & Algebra | Ratios |
| 20 | g5-math-rpa-02 | Intro to Expressions & Variables | Ratios, Proportions & Algebra | Algebraic Foundations |

### Grade 6 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g6-math-rpa-01 | Ratios & Rates | Ratios, Proportions & Algebra | Ratios |
| 2 | g6-math-rpa-02 | Unit Rates | Ratios, Proportions & Algebra | Ratios |
| 3 | g6-math-rpa-03 | Percent Concepts | Ratios, Proportions & Algebra | Percentages |
| 4 | g6-math-rpa-04 | Equivalent Ratios & Tables | Ratios, Proportions & Algebra | Ratios |
| 5 | g6-math-ns-01 | Dividing Fractions (Advanced) | Number Systems | Fractions |
| 6 | g6-math-ns-02 | Multi-Digit Decimal Operations | Number Systems | Decimals |
| 7 | g6-math-ns-03 | Greatest Common Factor & Least Common Multiple | Number Systems | Number Theory |
| 8 | g6-math-ns-04 | Positive & Negative Numbers | Number Systems | Integers |
| 9 | g6-math-ns-05 | Absolute Value | Number Systems | Integers |
| 10 | g6-math-ns-06 | Coordinate Plane (All Quadrants) | Number Systems | Coordinate Geometry |
| 11 | g6-math-exp-01 | Exponents & Order of Operations | Expressions & Equations | Exponents |
| 12 | g6-math-exp-02 | Writing Algebraic Expressions | Expressions & Equations | Expressions |
| 13 | g6-math-exp-03 | Evaluating Expressions | Expressions & Equations | Expressions |
| 14 | g6-math-exp-04 | Solving One-Step Equations | Expressions & Equations | Equations |
| 15 | g6-math-exp-05 | Solving One-Step Inequalities | Expressions & Equations | Inequalities |
| 16 | g6-math-exp-06 | Independent & Dependent Variables | Expressions & Equations | Functions |
| 17 | g6-math-geo-01 | Area of Triangles & Polygons | Geometry | Area |
| 18 | g6-math-geo-02 | Volume & Surface Area | Geometry | Volume |
| 19 | g6-math-stat-01 | Statistical Questions & Data Distribution | Statistics & Probability | Data |
| 20 | g6-math-stat-02 | Measures of Center (Mean, Median, Mode) | Statistics & Probability | Statistics |

### Grade 7 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g7-math-rpa-01 | Proportional Relationships | Ratios & Proportions | Proportions |
| 2 | g7-math-rpa-02 | Constant of Proportionality | Ratios & Proportions | Proportions |
| 3 | g7-math-rpa-03 | Percent Applications (Tax, Tip, Discount) | Ratios & Proportions | Percentages |
| 4 | g7-math-rpa-04 | Scale Drawings | Ratios & Proportions | Scale |
| 5 | g7-math-ns-01 | Adding & Subtracting Rational Numbers | Number Systems | Rational Numbers |
| 6 | g7-math-ns-02 | Multiplying & Dividing Rational Numbers | Number Systems | Rational Numbers |
| 7 | g7-math-ns-03 | Operations with Fractions & Decimals | Number Systems | Rational Numbers |
| 8 | g7-math-exp-01 | Equivalent Expressions | Expressions & Equations | Expressions |
| 9 | g7-math-exp-02 | Solving Two-Step Equations | Expressions & Equations | Equations |
| 10 | g7-math-exp-03 | Solving Two-Step Inequalities | Expressions & Equations | Inequalities |
| 11 | g7-math-exp-04 | Multi-Step Equations with Rational Numbers | Expressions & Equations | Equations |
| 12 | g7-math-geo-01 | Scale Drawings & Constructions | Geometry | Scale |
| 13 | g7-math-geo-02 | Angles & Angle Relationships | Geometry | Angles |
| 14 | g7-math-geo-03 | Circles: Area & Circumference | Geometry | Circles |
| 15 | g7-math-geo-04 | 3D Shapes: Volume & Surface Area | Geometry | Volume |
| 16 | g7-math-geo-05 | Cross-Sections of 3D Figures | Geometry | 3D Geometry |
| 17 | g7-math-stat-01 | Sampling & Populations | Statistics & Probability | Data |
| 18 | g7-math-stat-02 | Comparing Data Sets | Statistics & Probability | Statistics |
| 19 | g7-math-stat-03 | Probability Concepts | Statistics & Probability | Probability |
| 20 | g7-math-stat-04 | Compound Probability | Statistics & Probability | Probability |

### Grade 8 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g8-math-ns-01 | Rational & Irrational Numbers | Number Systems | Real Numbers |
| 2 | g8-math-ns-02 | Square Roots & Cube Roots | Number Systems | Roots |
| 3 | g8-math-ns-03 | Approximating Irrational Numbers | Number Systems | Real Numbers |
| 4 | g8-math-exp-01 | Integer Exponents | Expressions & Equations | Exponents |
| 5 | g8-math-exp-02 | Scientific Notation | Expressions & Equations | Scientific Notation |
| 6 | g8-math-exp-03 | Solving Linear Equations | Expressions & Equations | Equations |
| 7 | g8-math-exp-04 | Solving Special Cases (No Solution, Identity) | Expressions & Equations | Equations |
| 8 | g8-math-exp-05 | Slope & Rate of Change | Expressions & Equations | Linear Functions |
| 9 | g8-math-exp-06 | Graphing Linear Equations | Expressions & Equations | Linear Functions |
| 10 | g8-math-exp-07 | Writing Linear Equations | Expressions & Equations | Linear Functions |
| 11 | g8-math-exp-08 | Systems of Linear Equations | Expressions & Equations | Systems |
| 12 | g8-math-exp-09 | Solving Systems by Graphing | Expressions & Equations | Systems |
| 13 | g8-math-exp-10 | Solving Systems by Substitution/Elimination | Expressions & Equations | Systems |
| 14 | g8-math-exp-11 | Functions: Inputs & Outputs | Expressions & Equations | Functions |
| 15 | g8-math-exp-12 | Comparing Functions | Expressions & Equations | Functions |
| 16 | g8-math-geo-01 | Transformations (Translations, Reflections, Rotations) | Geometry | Transformations |
| 17 | g8-math-geo-02 | Congruence & Similarity | Geometry | Congruence |
| 18 | g8-math-geo-03 | Pythagorean Theorem | Geometry | Pythagorean Theorem |
| 19 | g8-math-geo-04 | Distance Between Points | Geometry | Coordinate Geometry |
| 20 | g8-math-stat-01 | Scatter Plots & Association | Statistics & Probability | Data |

### Grade 9 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g9-math-alg-01 | Solving Multi-Step Linear Equations | Algebra | Equations |
| 2 | g9-math-alg-02 | Linear Inequalities | Algebra | Inequalities |
| 3 | g9-math-alg-03 | Compound Inequalities | Algebra | Inequalities |
| 4 | g9-math-alg-04 | Absolute Value Equations & Inequalities | Algebra | Absolute Value |
| 5 | g9-math-alg-05 | Systems of Linear Inequalities | Algebra | Systems |
| 6 | g9-math-alg-06 | Direct & Inverse Variation | Algebra | Variation |
| 7 | g9-math-func-01 | Function Notation & Evaluation | Functions | Function Concepts |
| 8 | g9-math-func-02 | Domain & Range | Functions | Function Concepts |
| 9 | g9-math-func-03 | Linear Functions & Slope-Intercept Form | Functions | Linear Functions |
| 10 | g9-math-func-04 | Point-Slope & Standard Forms | Functions | Linear Functions |
| 11 | g9-math-func-05 | Parallel & Perpendicular Lines | Functions | Linear Functions |
| 12 | g9-math-func-06 | Intro to Exponential Functions | Functions | Exponential Functions |
| 13 | g9-math-geo-01 | Congruent Triangles & Proofs | Geometry | Triangles |
| 14 | g9-math-geo-02 | Similar Triangles | Geometry | Triangles |
| 15 | g9-math-geo-03 | Right Triangle Trigonometry | Geometry | Trigonometry |
| 16 | g9-math-geo-04 | Quadrilaterals & Polygons | Geometry | Polygons |
| 17 | g9-math-geo-05 | Circles: Tangents, Chords, Arcs | Geometry | Circles |
| 18 | g9-math-stat-01 | Two-Way Tables & Relative Frequencies | Statistics & Probability | Data |
| 19 | g9-math-stat-02 | Scatter Plots & Line of Best Fit | Statistics & Probability | Data |
| 20 | g9-math-stat-03 | Interpreting Linear Models | Statistics & Probability | Data |

### Grade 10 Math Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g10-math-alg-01 | Polynomial Operations | Algebra | Polynomials |
| 2 | g10-math-alg-02 | Factoring Polynomials | Algebra | Polynomials |
| 3 | g10-math-alg-03 | Solving Quadratic Equations (Factoring) | Algebra | Quadratics |
| 4 | g10-math-alg-04 | Completing the Square | Algebra | Quadratics |
| 5 | g10-math-alg-05 | Quadratic Formula | Algebra | Quadratics |
| 6 | g10-math-alg-06 | Complex Numbers | Algebra | Complex Numbers |
| 7 | g10-math-func-01 | Quadratic Functions & Graphs | Functions | Quadratic Functions |
| 8 | g10-math-func-02 | Vertex Form & Transformations | Functions | Quadratic Functions |
| 9 | g10-math-func-03 | Exponential Growth & Decay | Functions | Exponential Functions |
| 10 | g10-math-func-04 | Sequences (Arithmetic & Geometric) | Functions | Sequences |
| 11 | g10-math-func-05 | Piecewise Functions | Functions | Piecewise Functions |
| 12 | g10-math-func-06 | Inverse Functions | Functions | Function Concepts |
| 13 | g10-math-geo-01 | Coordinate Geometry Proofs | Geometry | Coordinate Geometry |
| 14 | g10-math-geo-02 | Trigonometric Ratios & Applications | Geometry | Trigonometry |
| 15 | g10-math-geo-03 | Law of Sines & Cosines | Geometry | Trigonometry |
| 16 | g10-math-geo-04 | Arc Length & Sector Area | Geometry | Circles |
| 17 | g10-math-stat-01 | Probability & Conditional Probability | Statistics & Probability | Probability |
| 18 | g10-math-stat-02 | Independent & Dependent Events | Statistics & Probability | Probability |
| 19 | g10-math-stat-03 | Data Collection & Experimental Design | Statistics & Probability | Data |
| 20 | g10-math-stat-04 | Normal Distribution | Statistics & Probability | Statistics |

---

## 4. Core English — Grades 3–10

### Domains

| Domain | Code | Description |
|--------|------|-------------|
| Reading: Literature | `rl` | Stories, drama, poetry, literary analysis |
| Reading: Informational Text | `ri` | Nonfiction, articles, historical texts |
| Writing | `w` | Composition, argument, narrative, research |
| Language | `l` | Grammar, vocabulary, conventions |

### Grade 3 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g3-eng-rl-01 | Ask & Answer Questions (Literature) | Reading Literature | Key Ideas & Details |
| 2 | g3-eng-rl-02 | Recount Stories & Fables | Reading Literature | Key Ideas & Details |
| 3 | g3-eng-rl-03 | Character Traits & Motivations | Reading Literature | Craft & Structure |
| 4 | g3-eng-rl-04 | Literal & Nonliteral Language | Reading Literature | Craft & Structure |
| 5 | g3-eng-rl-05 | Story Structure (Beginning, Middle, End) | Reading Literature | Craft & Structure |
| 6 | g3-eng-ri-01 | Main Idea & Details | Reading Informational | Key Ideas & Details |
| 7 | g3-eng-ri-02 | Text Features (Headings, Diagrams, etc.) | Reading Informational | Craft & Structure |
| 8 | g3-eng-ri-03 | Cause & Effect | Reading Informational | Key Ideas & Details |
| 9 | g3-eng-ri-04 | Compare & Contrast Texts | Reading Informational | Integration of Ideas |
| 10 | g3-eng-ri-05 | Text Connections (Text-to-Text, Text-to-Self) | Reading Informational | Integration of Ideas |
| 11 | g3-eng-w-01 | Opinion Writing | Writing | Text Types |
| 12 | g3-eng-w-02 | Informative/Explanatory Writing | Writing | Text Types |
| 13 | g3-eng-w-03 | Narrative Writing | Writing | Text Types |
| 14 | g3-eng-w-04 | Writing Process (Plan, Draft, Revise) | Writing | Production |
| 15 | g3-eng-w-05 | Using Linking Words | Writing | Organization |
| 16 | g3-eng-l-01 | Parts of Speech (Nouns, Verbs, Adjectives) | Language | Grammar |
| 17 | g3-eng-l-02 | Subject-Verb Agreement | Language | Grammar |
| 18 | g3-eng-l-03 | Simple, Compound Sentences | Language | Sentence Structure |
| 19 | g3-eng-l-04 | Capitalization & Punctuation | Language | Conventions |
| 20 | g3-eng-l-05 | Grade-Level Vocabulary | Language | Vocabulary |

### Grade 4 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g4-eng-rl-01 | Theme of a Story | Reading Literature | Key Ideas & Details |
| 2 | g4-eng-rl-02 | Character Reactions & Motives | Reading Literature | Key Ideas & Details |
| 3 | g4-eng-rl-03 | Setting & Events in Stories | Reading Literature | Key Ideas & Details |
| 4 | g4-eng-rl-04 | Figurative Language (Similes, Metaphors) | Reading Literature | Craft & Structure |
| 5 | g4-eng-rl-05 | Comparing Story Versions | Reading Literature | Integration of Ideas |
| 6 | g4-eng-ri-01 | Main Idea & Supporting Details | Reading Informational | Key Ideas & Details |
| 7 | g4-eng-ri-02 | Firsthand & Secondhand Accounts | Reading Informational | Integration of Ideas |
| 8 | g4-eng-ri-03 | Text Structure (Chronology, Compare/Contrast) | Reading Informational | Craft & Structure |
| 9 | g4-eng-ri-04 | Author's Purpose & Evidence | Reading Informational | Craft & Structure |
| 10 | g4-eng-ri-05 | Integrating Information from Multiple Texts | Reading Informational | Integration of Ideas |
| 11 | g4-eng-w-01 | Opinion Writing with Reasons | Writing | Text Types |
| 12 | g4-eng-w-02 | Informative Writing with Facts | Writing | Text Types |
| 13 | g4-eng-w-03 | Narrative Writing with Dialogue | Writing | Text Types |
| 14 | g4-eng-w-04 | Organizing Paragraphs | Writing | Organization |
| 15 | g4-eng-w-05 | Conducting Short Research | Writing | Research |
| 16 | g4-eng-l-01 | Relative Pronouns & Adverbs | Language | Grammar |
| 17 | g4-eng-l-02 | Progressive Verb Tenses | Language | Grammar |
| 18 | g4-eng-l-03 | Prepositional Phrases | Language | Sentence Structure |
| 19 | g4-eng-l-04 | Commas & Quotations | Language | Conventions |
| 20 | g4-eng-l-05 | Grade-Level Academic Vocabulary | Language | Vocabulary |

### Grade 5 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g5-eng-rl-01 | Quote Accurately from Text | Reading Literature | Key Ideas & Details |
| 2 | g5-eng-rl-02 | Compare Characters, Settings, Events | Reading Literature | Key Ideas & Details |
| 3 | g5-eng-rl-03 | Figurative Language (Metaphors, Idioms, Proverbs) | Reading Literature | Craft & Structure |
| 4 | g5-eng-rl-04 | Point of View (1st vs 3rd Person) | Reading Literature | Craft & Structure |
| 5 | g5-eng-rl-05 | Analyzing Visual Elements | Reading Literature | Integration of Ideas |
| 6 | g5-eng-ri-01 | Drawing Inferences from Text | Reading Informational | Key Ideas & Details |
| 7 | g5-eng-ri-02 | Multiple Main Ideas | Reading Informational | Key Ideas & Details |
| 8 | g5-eng-ri-03 | Text Structure (Cause/Effect, Problem/Solution) | Reading Informational | Craft & Structure |
| 9 | g5-eng-ri-04 | Author's Point of View & Evidence | Reading Informational | Craft & Structure |
| 10 | g5-eng-ri-05 | Integrating Information from Multiple Sources | Reading Informational | Integration of Ideas |
| 11 | g5-eng-w-01 | Opinion Writing with Evidence | Writing | Text Types |
| 12 | g5-eng-w-02 | Informative Writing with Clear Organization | Writing | Text Types |
| 13 | g5-eng-w-03 | Narrative Writing with Pacing & Description | Writing | Text Types |
| 14 | g5-eng-w-04 | Revision & Editing | Writing | Production |
| 15 | g5-eng-w-05 | Research & Note-Taking | Writing | Research |
| 16 | g5-eng-l-01 | Perfect Verb Tenses | Language | Grammar |
| 17 | g5-eng-l-02 | Conjunctions & Transition Words | Language | Sentence Structure |
| 18 | g5-eng-l-03 | Correlative Conjunctions | Language | Sentence Structure |
| 19 | g5-eng-l-04 | Punctuation for Clarity (Commas, Dashes) | Language | Conventions |
| 20 | g5-eng-l-05 | Grade-Level Academic Vocabulary | Language | Vocabulary |

### Grade 6 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g6-eng-rl-01 | Cite Textual Evidence | Reading Literature | Key Ideas & Details |
| 2 | g6-eng-rl-02 | Theme & Central Idea | Reading Literature | Key Ideas & Details |
| 3 | g6-eng-rl-03 | Plot Development & Conflict | Reading Literature | Key Ideas & Details |
| 4 | g6-eng-rl-04 | Figurative & Connotative Meaning | Reading Literature | Craft & Structure |
| 5 | g6-eng-rl-05 | Analyzing Poetry Structure | Reading Literature | Craft & Structure |
| 6 | g6-eng-ri-01 | Central Ideas & Summarizing | Reading Informational | Key Ideas & Details |
| 7 | g6-eng-ri-02 | Citing Evidence to Support Analysis | Reading Informational | Key Ideas & Details |
| 8 | g6-eng-ri-03 | Analyzing Text Structure | Reading Informational | Craft & Structure |
| 9 | g6-eng-ri-04 | Author's Purpose & Rhetoric | Reading Informational | Craft & Structure |
| 10 | g6-eng-ri-05 | Evaluating Arguments & Claims | Reading Informational | Integration of Ideas |
| 11 | g6-eng-w-01 | Argument Writing with Claims & Evidence | Writing | Text Types |
| 12 | g6-eng-w-02 | Informative Writing with Topic Development | Writing | Text Types |
| 13 | g6-eng-w-03 | Narrative Writing with Structure | Writing | Text Types |
| 14 | g6-eng-w-04 | Writing with Organization & Transitions | Writing | Organization |
| 15 | g6-eng-w-05 | Research & Citing Sources | Writing | Research |
| 16 | g6-eng-l-01 | Pronoun Case & Number | Language | Grammar |
| 17 | g6-eng-l-02 | Intensive & Reflexive Pronouns | Language | Grammar |
| 18 | g6-eng-l-03 | Sentence Variety & Structure | Language | Sentence Structure |
| 19 | g6-eng-l-04 | Commas, Parentheses, Dashes | Language | Conventions |
| 20 | g6-eng-l-05 | Grade-Level Vocabulary in Context | Language | Vocabulary |

### Grade 7 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g7-eng-rl-01 | Cite Multiple Sources of Evidence | Reading Literature | Key Ideas & Details |
| 2 | g7-eng-rl-02 | Theme Development & Analysis | Reading Literature | Key Ideas & Details |
| 3 | g7-eng-rl-03 | Character & Plot Development | Reading Literature | Key Ideas & Details |
| 4 | g7-eng-rl-04 | Figurative Language & Word Choice | Reading Literature | Craft & Structure |
| 5 | g7-eng-rl-05 | Comparing Stories & Dramas | Reading Literature | Integration of Ideas |
| 6 | g7-eng-ri-01 | Central Ideas & Objective Summaries | Reading Informational | Key Ideas & Details |
| 7 | g7-eng-ri-02 | Analyzing Text Interactions | Reading Informational | Key Ideas & Details |
| 8 | g7-eng-ri-03 | Text Structure & Organization | Reading Informational | Craft & Structure |
| 9 | g7-eng-ri-04 | Author's Point of View & Tone | Reading Informational | Craft & Structure |
| 10 | g7-eng-ri-05 | Evaluating Claims & Evidence | Reading Informational | Integration of Ideas |
| 11 | g7-eng-w-01 | Argument Writing with Clear Claims | Writing | Text Types |
| 12 | g7-eng-w-02 | Informative Writing with Analysis | Writing | Text Types |
| 13 | g7-eng-w-03 | Narrative Writing with Dialogue & Pacing | Writing | Text Types |
| 14 | g7-eng-w-04 | Organizing Ideas & Cohesion | Writing | Organization |
| 15 | g7-eng-w-05 | Research & Evaluating Sources | Writing | Research |
| 16 | g7-eng-l-01 | Phrases & Clauses | Language | Sentence Structure |
| 17 | g7-eng-l-02 | Types of Sentences (Simple, Compound, Complex) | Language | Sentence Structure |
| 18 | g7-eng-l-03 | Active & Passive Voice | Language | Grammar |
| 19 | g7-eng-l-04 | Commas to Set Off Elements | Language | Conventions |
| 20 | g7-eng-l-05 | Grade-Level Vocabulary in Context | Language | Vocabulary |

### Grade 8 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g8-eng-rl-01 | Citing Evidence to Support Analysis | Reading Literature | Key Ideas & Details |
| 2 | g8-eng-rl-02 | Theme & Objective Summary | Reading Literature | Key Ideas & Details |
| 3 | g8-eng-rl-03 | Analyzing Dialogue & Incidents | Reading Literature | Key Ideas & Details |
| 4 | g8-eng-rl-04 | Figurative Language & Connotation | Reading Literature | Craft & Structure |
| 5 | g8-eng-rl-05 | Comparing Modern & Traditional Works | Reading Literature | Integration of Ideas |
| 6 | g8-eng-ri-01 | Central Ideas & Summarizing | Reading Informational | Key Ideas & Details |
| 7 | g8-eng-ri-02 | Analyzing Text Connections | Reading Informational | Key Ideas & Details |
| 8 | g8-eng-ri-03 | Text Structure & Purpose | Reading Informational | Craft & Structure |
| 9 | g8-eng-ri-04 | Author's Point of View & Rhetoric | Reading Informational | Craft & Structure |
| 10 | g8-eng-ri-05 | Evaluating Arguments & Counterclaims | Reading Informational | Integration of Ideas |
| 11 | g8-eng-w-01 | Argument Writing with Counterclaims | Writing | Text Types |
| 12 | g8-eng-w-02 | Informative Writing with Formal Style | Writing | Text Types |
| 13 | g8-eng-w-03 | Narrative Writing with Reflection | Writing | Text Types |
| 14 | g8-eng-w-04 | Writing with Transitions & Cohesion | Writing | Organization |
| 15 | g8-eng-w-05 | Research & Citation (MLA Basics) | Writing | Research |
| 16 | g8-eng-l-01 | Verbals (Gerunds, Participles, Infinitives) | Language | Grammar |
| 17 | g8-eng-l-02 | Mood in Verbs (Indicative, Imperative, Subjunctive) | Language | Grammar |
| 18 | g8-eng-l-03 | Active & Passive Voice (Advanced) | Language | Grammar |
| 19 | g8-eng-l-04 | Punctuation & Sentence Structure | Language | Conventions |
| 20 | g8-eng-l-05 | Grade-Level Vocabulary in Context | Language | Vocabulary |

### Grade 9 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g9-eng-rl-01 | Literary Analysis: Theme & Evidence | Reading Literature | Key Ideas & Details |
| 2 | g9-eng-rl-02 | Character Development & Motivation | Reading Literature | Key Ideas & Details |
| 3 | g9-eng-rl-03 | Plot Structure & Foreshadowing | Reading Literature | Key Ideas & Details |
| 4 | g9-eng-rl-04 | Figurative Language & Symbolism | Reading Literature | Craft & Structure |
| 5 | g9-eng-rl-05 | Analyzing Author's Choices | Reading Literature | Craft & Structure |
| 6 | g9-eng-ri-01 | Central Ideas & Complex Analysis | Reading Informational | Key Ideas & Details |
| 7 | g9-eng-ri-02 | Analyzing Text Development | Reading Informational | Key Ideas & Details |
| 8 | g9-eng-ri-03 | Analyzing Rhetorical Devices | Reading Informational | Craft & Structure |
| 9 | g9-eng-ri-04 | Purpose & Perspective | Reading Informational | Craft & Structure |
| 10 | g9-eng-ri-05 | Evaluating Arguments Across Texts | Reading Informational | Integration of Ideas |
| 11 | g9-eng-w-01 | Argument Writing with Thesis | Writing | Text Types |
| 12 | g9-eng-w-02 | Expository Writing with Evidence | Writing | Text Types |
| 13 | g9-eng-w-03 | Narrative Writing with Techniques | Writing | Text Types |
| 14 | g9-eng-w-04 | Essay Structure & Organization | Writing | Organization |
| 15 | g9-eng-w-05 | Research & MLA Format | Writing | Research |
| 16 | g9-eng-l-01 | Parallel Structure | Language | Sentence Structure |
| 17 | g9-eng-l-02 | Colons & Semicolons | Language | Conventions |
| 18 | g9-eng-l-03 | Subject-Verb Agreement (Advanced) | Language | Grammar |
| 19 | g9-eng-l-04 | Word Choice & Tone | Language | Vocabulary |
| 20 | g9-eng-l-05 | Academic Vocabulary (Tier 2) | Language | Vocabulary |

### Grade 10 English Skills (20 skills)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | g10-eng-rl-01 | Literary Analysis: Theme & Complex Characters | Reading Literature | Key Ideas & Details |
| 2 | g10-eng-rl-02 | Analyzing Author's Literary Choices | Reading Literature | Craft & Structure |
| 3 | g10-eng-rl-03 | Interpreting Figurative Language & Allusions | Reading Literature | Craft & Structure |
| 4 | g10-eng-rl-04 | Comparing Texts from Different Periods | Reading Literature | Integration of Ideas |
| 5 | g10-eng-rl-05 | Analyzing World Literature | Reading Literature | Integration of Ideas |
| 6 | g10-eng-ri-01 | Central Ideas & Nuanced Analysis | Reading Informational | Key Ideas & Details |
| 7 | g10-eng-ri-02 | Analyzing Organizational Patterns | Reading Informational | Craft & Structure |
| 8 | g10-eng-ri-03 | Analyzing Rhetorical Appeals | Reading Informational | Craft & Structure |
| 9 | g10-eng-ri-04 | Evaluating Arguments & Fallacies | Reading Informational | Integration of Ideas |
| 10 | g10-eng-ri-05 | Synthesizing Across Multiple Texts | Reading Informational | Integration of Ideas |
| 11 | g10-eng-w-01 | Argument Writing with Sophisticated Claims | Writing | Text Types |
| 12 | g10-eng-w-02 | Expository Writing with Synthesis | Writing | Text Types |
| 13 | g10-eng-w-03 | Narrative Writing with Literary Techniques | Writing | Text Types |
| 14 | g10-eng-w-04 | Essay Writing with Cohesion & Style | Writing | Organization |
| 15 | g10-eng-w-05 | Research & Synthesis Writing | Writing | Research |
| 16 | g10-eng-l-01 | Sentence Structure for Effect | Language | Sentence Structure |
| 17 | g10-eng-l-02 | Precise Language & Domain-Specific Vocabulary | Language | Vocabulary |
| 18 | g10-eng-l-03 | Grammar & Usage in Context | Language | Grammar |
| 19 | g10-eng-l-04 | Punctuation for Effect | Language | Conventions |
| 20 | g10-eng-l-05 | Academic Vocabulary (Tier 2 & 3) | Language | Vocabulary |

---

## 5. MAP Growth — Math (RIT Bands 151–280)

### Domains

| Domain | Code | Description |
|--------|------|-------------|
| Operations & Algebraic Thinking | `oa` | Number operations, patterns, expressions |
| Number & Operations | `no` | Place value, fractions, decimals, integers |
| Measurement & Data | `md` | Measurement, data analysis, statistics |
| Geometry | `geo` | Shapes, coordinate geometry, transformations |

### RIT Band Structure

| RIT Band | Level | Typical Grades | Skill Count |
|----------|-------|----------------|-------------|
| 151–160 | 1 | K–1 | 10 |
| 161–170 | 2 | 1–2 | 10 |
| 171–180 | 3 | 2–3 | 10 |
| 181–190 | 4 | 3–4 | 10 |
| 191–200 | 5 | 4–5 | 10 |
| 201–210 | 6 | 5–6 | 10 |
| 211–220 | 7 | 6–7 | 10 |
| 221–230 | 8 | 7–8 | 10 |
| 231–240 | 9 | 8–9 | 10 |
| 241–250 | 10 | 9–10 | 10 |
| 251–260 | 11 | 10+ | 8 |
| 261–270 | 12 | Advanced | 6 |
| 271–280 | 13 | Highly Advanced | 4 |

### MAP Math Skills per RIT Band (example: 191–200)

| # | Code | Name | Domain |
|---|------|------|--------|
| 1 | map-math-191-oa-01 | Multiplication & Division Facts | Operations & Algebraic Thinking |
| 2 | map-math-191-oa-02 | Patterns with Multiplication | Operations & Algebraic Thinking |
| 3 | map-math-191-oa-03 | Multi-Step Word Problems | Operations & Algebraic Thinking |
| 4 | map-math-191-no-01 | Fractions: Equivalent & Comparing | Number & Operations |
| 5 | map-math-191-no-02 | Decimals to Tenths & Hundredths | Number & Operations |
| 6 | map-math-191-no-03 | Place Value to Millions | Number & Operations |
| 7 | map-math-191-md-01 | Measurement Conversions | Measurement & Data |
| 8 | map-math-191-md-02 | Data: Bar Graphs & Line Plots | Measurement & Data |
| 9 | map-math-191-geo-01 | Area & Perimeter | Geometry |
| 10 | map-math-191-geo-02 | Classifying Angles & Shapes | Geometry |

---

## 6. MAP Growth — Reading (RIT Bands 151–280)

### Domains

| Domain | Code | Description |
|--------|------|-------------|
| Literary Text | `lit` | Fiction, poetry, drama |
| Informational Text | `info` | Nonfiction, articles, arguments |
| Vocabulary | `vocab` | Word meaning, context clues, affixes |
| Language & Writing | `lang` | Grammar, conventions, writing |

### MAP Reading Skills per RIT Band (example: 191–200)

| # | Code | Name | Domain |
|---|------|------|--------|
| 1 | map-read-191-lit-01 | Character Traits & Feelings | Literary Text |
| 2 | map-read-191-lit-02 | Story Plot & Sequence | Literary Text |
| 3 | map-read-191-lit-03 | Making Predictions | Literary Text |
| 4 | map-read-191-info-01 | Main Idea & Details | Informational Text |
| 5 | map-read-191-info-02 | Text Features | Informational Text |
| 6 | map-read-191-info-03 | Compare & Contrast | Informational Text |
| 7 | map-read-191-vocab-01 | Context Clues | Vocabulary |
| 8 | map-read-191-vocab-02 | Prefixes & Suffixes | Vocabulary |
| 9 | map-read-191-lang-01 | Parts of Speech | Language & Writing |
| 10 | map-read-191-lang-02 | Sentence Structure | Language & Writing |

---

## 7. SAT Math

### Domains (Official College Board)

| Domain | Code | Skills | Questions on Test |
|--------|------|--------|-------------------|
| Algebra | `alg` | 5 | 13–15 |
| Advanced Math | `adv` | 5 | 13–15 |
| Problem-Solving & Data Analysis | `psda` | 5 | 5–7 |
| Geometry & Trigonometry | `geo` | 4 | 5–7 |

### SAT Math Skills (19 total)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | sat-math-alg-01 | Linear Equations in One Variable | Algebra | Linear Equations |
| 2 | sat-math-alg-02 | Linear Functions | Algebra | Linear Functions |
| 3 | sat-math-alg-03 | Linear Inequalities | Algebra | Linear Inequalities |
| 4 | sat-math-alg-04 | Systems of Linear Equations | Algebra | Systems |
| 5 | sat-math-alg-05 | Systems of Linear Inequalities | Algebra | Systems |
| 6 | sat-math-adv-01 | Equivalent Expressions | Advanced Math | Expressions |
| 7 | sat-math-adv-02 | Nonlinear Equations in One Variable | Advanced Math | Equations |
| 8 | sat-math-adv-03 | Systems of Nonlinear Equations | Advanced Math | Systems |
| 9 | sat-math-adv-04 | Quadratic Functions | Advanced Math | Quadratics |
| 10 | sat-math-adv-05 | Exponential Functions | Advanced Math | Exponentials |
| 11 | sat-math-psda-01 | Ratios, Rates & Proportional Relationships | Problem-Solving & Data Analysis | Ratios |
| 12 | sat-math-psda-02 | Percentages | Problem-Solving & Data Analysis | Percentages |
| 13 | sat-math-psda-03 | Data Analysis & Distributions | Problem-Solving & Data Analysis | Data |
| 14 | sat-math-psda-04 | Probability & Conditional Probability | Problem-Solving & Data Analysis | Probability |
| 15 | sat-math-psda-05 | Statistical Inference & Sampling | Problem-Solving & Data Analysis | Statistics |
| 16 | sat-math-geo-01 | Area & Volume | Geometry & Trigonometry | Area & Volume |
| 17 | sat-math-geo-02 | Lines, Angles & Triangles | Geometry & Trigonometry | Lines & Angles |
| 18 | sat-math-geo-03 | Right Triangles & Trigonometry | Geometry & Trigonometry | Trigonometry |
| 19 | sat-math-geo-04 | Circles | Geometry & Trigonometry | Circles |

---

## 8. SAT Reading & Writing

### Domains (Official College Board)

| Domain | Code | Skills | Questions on Test |
|--------|------|--------|-------------------|
| Information & Ideas | `info` | 3 | 8–12 |
| Craft & Structure | `craft` | 3 | 8–12 |
| Expression of Ideas | `expr` | 2 | 8–12 |
| Standard English Conventions | `conv` | 2 | 8–12 |

### SAT Reading & Writing Skills (12 total)

| # | Code | Name | Domain | Category |
|---|------|------|--------|----------|
| 1 | sat-rw-info-01 | Central Ideas & Details | Information & Ideas | Reading Comprehension |
| 2 | sat-rw-info-02 | Inferences | Information & Ideas | Reading Comprehension |
| 3 | sat-rw-info-03 | Command of Evidence (Textual & Quantitative) | Information & Ideas | Reading Comprehension |
| 4 | sat-rw-craft-01 | Words in Context | Craft & Structure | Vocabulary |
| 5 | sat-rw-craft-02 | Text Structure & Purpose | Craft & Structure | Text Analysis |
| 6 | sat-rw-craft-03 | Cross-Text Connections | Craft & Structure | Text Analysis |
| 7 | sat-rw-expr-01 | Transitions | Expression of Ideas | Writing |
| 8 | sat-rw-expr-02 | Rhetorical Synthesis | Expression of Ideas | Writing |
| 9 | sat-rw-conv-01 | Boundaries (Sentence Boundaries, Punctuation) | Standard English Conventions | Grammar |
| 10 | sat-rw-conv-02 | Form, Structure & Sense | Standard English Conventions | Grammar |
| 11 | sat-rw-conv-03 | Pronoun-Antecedent Agreement | Standard English Conventions | Grammar |
| 12 | sat-rw-conv-04 | Verb Tense & Agreement | Standard English Conventions | Grammar |

---

## 9. Micro-Skill & Question Generation Plan

### Micro-Skills per Skill

Each skill gets **3 micro-skills**, each with a specific learning objective:

| Micro-Skill Level | Focus | Question Count |
|-------------------|-------|----------------|
| Basic (order: 1) | Foundational understanding | 10 gold questions |
| Intermediate (order: 2) | Application & analysis | 10 gold questions |
| Advanced (order: 3) | Synthesis & evaluation | 10 gold questions |

### Question Distribution per Skill

| Difficulty | Count per Micro-Skill | Total per Skill |
|------------|----------------------|-----------------|
| Easy | 3 questions | 10 |
| Medium | 4 questions | 10 |
| Hard | 3 questions | 10 |

### Gold Question → QuestionFamily → Question Pipeline

```
Each Gold Question → 1 QuestionFamily → 3 Question variations → 3 QuestionVersions
```

This means each gold question template generates 3 published questions with varied numbers/contexts.

### Total Question Count Targets

| Program | Skills | Micro-Skills | Gold Questions | Total Questions |
|---------|--------|-------------|---------------|----------------|
| Core Math G3–10 | 160 | 480 | 4,800 | 14,400 |
| Core English G3–10 | 160 | 480 | 4,800 | 14,400 |
| MAP Math | 120 | 360 | 3,600 | 10,800 |
| MAP Reading | 120 | 360 | 3,600 | 10,800 |
| SAT Math | 19 | 57 | 570 | 1,710 |
| SAT R&W | 12 | 36 | 360 | 1,080 |
| **Total** | **591** | **1,773** | **17,730** | **53,190** |

---

## 10. Seed Data Script Implementation

### File: `prisma/seed-curriculum.ts`

The seed script will:

1. **Create/verify programs**: core-math, core-english, map-math, map-reading, sat-math, sat-rw
2. **Create grades**: 8 levels per core program, 13 RIT bands per MAP program, 2 levels for SAT
3. **Create skills**: ~591 total with full hierarchy
4. **Create micro-skills**: 3 per skill (~1,773 total)
5. **Create sample gold questions**: 10 per micro-skill for initial seed
6. **Create question families**: 1 per gold question
7. **Create questions**: 3 variations per family

### Implementation Phases

| Phase | Scope | Skills | Questions |
|-------|-------|--------|-----------|
| Phase 1 | SAT Math & R&W | 31 | 1,000+ |
| Phase 2 | Core Math G3–5 | 60 | 1,800+ |
| Phase 3 | Core Math G6–10 | 100 | 3,000+ |
| Phase 4 | Core English G3–5 | 60 | 1,800+ |
| Phase 5 | Core English G6–10 | 100 | 3,000+ |
| Phase 6 | MAP Math | 120 | 3,600+ |
| Phase 7 | MAP Reading | 120 | 3,600+ |
| Total | | 591 | 17,730+ |

### Seed Data Storage

The gold question data is stored in:
- `src/data/seed/core-math/` — Grade-level JSON files
- `src/data/seed/core-english/` — Grade-level JSON files
- `src/data/seed/map-math/` — RIT band JSON files
- `src/data/seed/map-reading/` — RIT band JSON files
- `src/data/seed/sat-math/` — Domain JSON files
- `src/data/seed/sat-rw/` — Domain JSON files

---

## 11. Seed Script: `prisma/seed-curriculum.ts`

```typescript
// prisma/seed-curriculum.ts
// Full curriculum seed for Practice Buddy
// Run: npx tsx prisma/seed-curriculum.ts

import { PrismaClient } from "@prisma/client"
import * as crypto from "crypto"

const prisma = new PrismaClient()

// ─── Program Definitions ───

interface ProgramDef {
  code: string
  name: string
  description: string
  grades: GradeDef[]
}

interface GradeDef {
  level: number
  label: string
  skills: SkillDef[]
}

interface SkillDef {
  code: string
  name: string
  subject: string
  domain: string
  category: string
  subcategory: string
  difficulty: string
  microSkills: MicroSkillDef[]
}

interface MicroSkillDef {
  code: string
  name: string
  learningObjective: string
  difficulty: string
  order: number
}

// Program definitions are loaded from seed data files
// For now, the curriculum plan above serves as the specification
// Individual question generation is handled by AI question factory

async function main() {
  console.log("🌱 Seeding Practice Buddy Curriculum...")
  
  const tenantId = (await prisma.tenant.findFirst({ where: { slug: "aeeg" } }))?.id
  if (!tenantId) {
    throw new Error("Tenant 'aeeg' not found. Run prisma/seed.ts first.")
  }
  
  // Phase 1: SAT Math & Reading/Writing
  await seedSATProgram(tenantId)
  
  // Phase 2: Core Math Grades 3-10
  await seedCoreMathProgram(tenantId)
  
  // Phase 3: Core English Grades 3-10
  await seedCoreEnglishProgram(tenantId)
  
  // Phase 4: MAP Math
  await seedMAPMathProgram(tenantId)
  
  // Phase 5: MAP Reading
  await seedMAPReadingProgram(tenantId)
  
  console.log("✅ Curriculum seed complete!")
}

async function seedProgram(tenantId: string, program: ProgramDef) {
  console.log(`\n📦 Program: ${program.name}`)
  
  const dbProgram = await prisma.program.upsert({
    where: { tenantId_code: { tenantId, code: program.code } },
    create: { tenantId, code: program.code, name: program.name, description: program.description },
    update: { name: program.name, description: program.description },
  })
  
  for (const grade of program.grades) {
    const dbGrade = await prisma.grade.upsert({
      where: { programId_level: { programId: dbProgram.id, level: grade.level } },
      create: { programId: dbProgram.id, level: grade.level, label: grade.label },
      update: { label: grade.label },
    })
    
    console.log(`  📚 Grade ${grade.label}: ${grade.skills.length} skills`)
    
    for (const skill of grade.skills) {
      const dbSkill = await prisma.skill.upsert({
        where: { gradeId_code: { gradeId: dbGrade.id, code: skill.code } },
        create: {
          gradeId: dbGrade.id,
          code: skill.code,
          name: skill.name,
          subject: skill.subject,
          domain: skill.domain,
          category: skill.category,
          subcategory: skill.subcategory,
          difficulty: skill.difficulty,
        },
        update: { name: skill.name, subject: skill.subject, domain: skill.domain },
      })
      
      // Create micro-skills
      for (const ms of skill.microSkills) {
        await prisma.microSkill.upsert({
          where: { tenantId_skillId_code: { tenantId, skillId: dbSkill.id, code: ms.code } },
          create: {
            tenantId,
            skillId: dbSkill.id,
            code: ms.code,
            name: ms.name,
            learningObjective: ms.learningObjective,
            difficulty: ms.difficulty,
            order: ms.order,
          },
          update: { name: ms.name, learningObjective: ms.learningObjective },
        })
      }
    }
  }
}

// ─── SAT Math Program Definition ───

function getSATMathProgram(): ProgramDef {
  const satMathSkills: SkillDef[] = [
    {
      code: "sat-math-alg-01", name: "Linear Equations in One Variable",
      subject: "math", domain: "Algebra", category: "Linear Equations", subcategory: "Solving", difficulty: "medium",
      microSkills: [
        { code: "sat-math-alg-01-basic", name: "Solving Basic Linear Equations", learningObjective: "Solve one-variable linear equations with integer coefficients.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-01-app", name: "Linear Equations in Context", learningObjective: "Set up and solve linear equations from word problems.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-01-adv", name: "Equations with Rational Coefficients", learningObjective: "Solve linear equations with fractional and decimal coefficients.", difficulty: "hard", order: 3 },
      ]
    },
    // ... (truncated in doc, full data in seed script)
  ]
  
  // All 19 SAT Math skills defined similarly
  return {
    code: "sat-math",
    name: "SAT Math",
    description: "Digital SAT Math — Algebra, Advanced Math, PSDA, Geometry & Trigonometry",
    grades: [
      { level: 0, label: "SAT Math", skills: satMathSkills },
    ],
  }
}

// ⚠️ NOTE: The full seed script implementation with ALL skill definitions
// is in prisma/seed-curriculum.ts. This document outlines the complete
// curriculum specification. Run the seed script to populate the database.

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## 12. Running the Seed

```bash
# 1. First run the base seed (tenant, admin, etc.)
npx tsx prisma/seed.ts

# 2. Then run the curriculum seed
npx tsx prisma/seed-curriculum.ts

# 3. Verify the seed
npx tsx prisma/verify-seed.ts
```

### Verification Script

```typescript
// prisma/verify-seed.ts
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const programs = await prisma.program.count()
  const grades = await prisma.grade.count()
  const skills = await prisma.skill.count()
  const microSkills = await prisma.microSkill.count()
  const goldQuestions = await prisma.goldQuestion.count()
  const questions = await prisma.question.count()
  
  console.log("📊 Seed Statistics:")
  console.log(`  Programs:      ${programs}`)
  console.log(`  Grades:        ${grades}`)
  console.log(`  Skills:        ${skills}`)
  console.log(`  Micro-Skills:  ${microSkills}`)
  console.log(`  Gold Questions: ${goldQuestions}`)
  console.log(`  Questions:     ${questions}`)
}
main().finally(() => prisma.$disconnect())
```

---

## 13. Adding Questions via AI Question Factory

The AI Question Factory (`src/app/api/admin/ai-factory/route.ts`) can generate questions for any skill. After seeding the curriculum structure:

1. Select a micro-skill
2. Call the AI factory with the micro-skill's learning objective
3. Validate generated questions
4. Publish approved questions

This phased approach ensures the curriculum structure is in place first, then questions are generated iteratively.

---

## Appendix: Skill Code Convention

`<program>-<grade/band>-<domain>-<sequence>`

Examples:
- `g3-math-oa-01` = Core Math, Grade 3, Operations & Algebraic Thinking, Skill 1
- `g8-eng-rl-04` = Core English, Grade 8, Reading Literature, Skill 4
- `sat-math-alg-03` = SAT Math, Algebra, Skill 3
- `map-math-191-oa-01` = MAP Math, RIT 191–200, Operations & Algebraic Thinking, Skill 1
- `sat-rw-info-02` = SAT Reading & Writing, Information & Ideas, Skill 2