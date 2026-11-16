---
name: prototype
description: Explore and validate design or technical alternatives through disposable experiments
---

Resolve uncertain design or technical decisions through fast, disposable experiments. Optimize for learning rather than production quality.

## Workflow

1. **Define the decision**
   - Identify the specific question the prototype should answer.
   - Establish what must be observed or compared to reach a decision.
   - If there is no meaningful uncertainty, use the feature workflow instead.
   - Avoid extensive planning and documentation.

2. **Explore alternatives**
   - Investigate existing patterns or approaches when useful.
   - Use designer for interface exploration, researcher for external evidence, and oracle for difficult trade-offs when warranted.
   - Identify plausible alternatives worth testing.
   - Present directions for user input before building when the choice significantly affects the experiment.

3. **Build disposable experiments**
   - Delegate implementation to worker when useful.
   - Build in an isolated scratch directory, separate from production source.
   - Use the simplest tools and technologies that can answer the question.
   - Favor speed and experimentation over abstractions, maintainability, and comprehensive tests.
   - When comparing alternatives, make switching between them easy.
   - Do not modify production systems or shared infrastructure without authorization.

4. **Observe actual behavior**
   - Evaluate each alternative on the surface relevant to the decision.
   - For interfaces, render and interact with each variant. Capture screenshots when useful.
   - For technical questions, measure or observe the actual behavior being investigated.
   - Distinguish observed results from assumptions and expectations.
   - Do not claim validation when the relevant behavior could not be observed.

5. **Present the findings**
   - Show the alternatives, observations, and trade-offs.
   - Recommend a direction and explain why.
   - Identify remaining uncertainties.
   - Provide access to the prototype artifacts and state their disposable nature.
   - Request user input on consequential decisions before moving to production implementation.

## Principles

- A prototype exists to answer a question, not to become production code.
- Prefer the cheapest experiment capable of producing useful evidence.
- Explore alternatives when comparison improves the decision.
- Actual observation matters more than theoretical correctness.
- Keep prototypes isolated and disposable.
- The user retains authority over consequential design decisions.
- Once a direction is chosen, use the feature workflow for production implementation.
