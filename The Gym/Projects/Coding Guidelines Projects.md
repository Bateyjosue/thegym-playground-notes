## First steps of development

- Add fonts used in Figma inside the project
- Add colors defined in the Figma style guide inside the project
- Create small reusable components such as
    - Buttons
    - Input fields
    - Cards
- Create the general layout by implementing things like the navigation bar (both desktop and mobile versions) and the footer.
- Add icons used in the Figma design to the project.
- Look for components that are used across different pages and create them and make sure they are reusable across the different pages.

## Contribution rules and git flow

### Branching

- Before making any new changes make sure to go back to the `dev` branch pull and create a new branch from there
- Make sure to follow this branch naming convention
    [Branching Model](https://www.notion.so/Branching-Model-30b53ad434d2450bb9ab39cbf2ded080?pvs=21)
- The dev branch is where developers work on
- Always use the dev branch as the base branch of your pull requests
- The staging branch has a public link that is used to show progress to the client
- The main branch is the production branch.
- Change the base branch using other methods like `git rebase` instead of using the pull request merging for the `dev`, `main`, and `staging`
    

### Commits

- Follow this guideline [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages
- Try to create a mid-sized every couple of minutes/hours. But more importantly, try to let commits be logically consistent contributions. That means if you have many changes in lines of code you can split them up into multiple commits but each of those commits should have an independent meaning that is described by the commit message.

### PRs, Code Review

- Once you made the first commit just go ahead and push the changes
- Create a Pull request once you pushed your changes to the repository, you don't have to wait to finish the feature in order to create a pull request you can create it as soon as you have the first commit.
- The name of the PR should follow the same naming convention as the commit messages. ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)).
    - Eg: `feat: integrate react markdown`
- If a PR is still being worked on add the GitHub tag `Work in progress`
- Before marking a PR as `Ready for review` make sure that the CI (GitHub actions) and the deployment are passing.
- Request code review by adding the code reviewer as a reviewer to your PR
- After requesting for code review make sure to send a slack message to the project channel with the link to the PR and tag the code reviewer
- PRs should cover a set of related changes covering a single feature, bug fix, or other types of changes
- Delete branches once they are merged

### Resolving Conflicts

- Be super careful, involve the others who are working on similar stuff.
- Make sure you understand what you are accepting or refusing.
- Recent changes are not always the relevant ones, always check that you are not dismissing changes that are actually fixing another bug

### Things to avoid in git

- Avoid using the squash commits feature, it tends to bring conflicts especially when people are using other base branches
- Do not use git force push
- Do not merge your PRs unless your code has been reviewed by a code reviewer and the code reviewer has either approved your changes or accepted all the adjustments you have made upon their review.
- Avoid merging other dependencies PRs into the ones you are working on to avoid having duplicate changes into two PRs in case a change is needed to be used in another.
- Avoid committing the `node_modules` folder (or including it in the version history).
    - Since it usually contains thousands of files. it increases dramatically the size of your project
    - Due to the high number of files included in the `node_modules` folder, it gets harder to review PRs containing such changes.
    - → You should instead add the `node_modules` folder name to the `.gitignore` file to prevent `git` from tracking it

## CSS Rules

### Units of measurement

- Use `rem` whenever possible, and avoid using `px` as a measurement unit
- Translate the Figma designs to `rem`, by dividing the pixels by 16 ( `1rem` equal to `16px`)
- Use line-height ratio (which has no measurement) instead of `px`. To calculate it use the line-height in `px` and divide it by the font-size in `px`.
- page margin: convert the left-right padding of the pages to the content width. this is the formula to calculate it:

```
content_width = (figma_page_width - (padding_of_one_of_the_sides * 2)) * 100 / figma_page_width

content_width = (1264) * 100 / 1920
```

- When dealing with mobile devices (iOS and Android), in case you would want an element to occupy just the total height minus the address bar. You may consider using `100svh` instead of `100vh` as the CSS height value.
    - In tailwind CSS the `h-screen` class should give you a height of `100vh`, however, the `100svh` class is not present. you have to add it manually.
    - You can read more via this link [https://css-tricks.com/the-large-small-and-dynamic-viewports/](https://css-tricks.com/the-large-small-and-dynamic-viewports/)

## Tailwind config

> For every classname you add or modify in the config file. always try to follow the original format and style that tailwindcss uses. You can check the default complete configuration of tailwindcss here [https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js)

- Make sure all the custom class names added are named in a meaningful and reusable way
    - The name of the class should not be bound to where it is used it should instead reflect its role
    - It should be named in a way that it can be used across many components without causing confusion as to what it does or what it means
        - Eg: Instead of naming a width class of `project-description-tablet` with a value of `25.313rem`, I would use the formula below and add a spacing of `101.252`, and in that case the usage instead of being `md:w-project-description-tablet` would be `md:w-101.252`
            
            > Remark that the new class name no longer reflects which components or part of the project it is used in, it has instead a name that is globalized and can be reused multiple times without causing confusion
            
- For tailwind to calculate a spacing value name such as `w-1`, `p-2`, `m-3`
    - You should take the value in rem and divide it by `0.25`. `VALUE_IN_REM/0.25`
    - Conversely, you can take the class name value `my-[value]` (eg: for `w-3` take `3` as value) and multiply it by `0.25` to find the value in rem.
    - Alternatively, you can divide by `4` if the value is `px`. however, it is recommended to use values in rem. to convert to rem use `VALUE_IN_PX/16`
    - These custom spacing values should be added to the tailwind config under the `spacing` object.
- Custom attributes such as `w-1`, `gap-1`, `space-x-2`, `w-1`, `p-2`, and `m-2` should be customized under the `spacing` attributes in the tailwind config to avoid duplication in different class utilities that need them
- This is a default tailwindcss default config you can use for reference of how to name classes and where to place different values under the config file [https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js)
- When it comes to fraction classnames for measurements such as width. eg: `w-1/2`, These class names should normally be used for percentages.
    - These fractions should actually equal the value of the percentage. Meaning that (1/2) * 100 should equal `50`.
        
        - You should make sure, if you add custom fraction classes that they would give the same value as the one you give it. (as shown above)
    - A quick math formula to convert a percentage to a fraction is to divide the percentage by `100` and add a denominator of `100`
        
        For example, if you want to convert 25% to a fraction, you would divide `25` by `100` and get `0.25`. Then you can add a denominator of `100`, to get the fraction `25/100`.
        
        You will have to simplify both the numerator and denominator to the lowest possible value without a floating number. In this example, we will simplify it to 1/4 by dividing both the numerator and denominator by 25.
        
    - You can use this link to help with the conversion [https://www.calculatorsoup.com/calculators/math/percent-to-fraction-calculator.php](https://www.calculatorsoup.com/calculators/math/percent-to-fraction-calculator.php)
        

## Image optimizations

- Use `webp` format to load images faster and without quality loss.
    - This is applicable for images and not icons or logos.
    - Use this tool [https://cloudconvert.com/webp-converter](https://cloudconvert.com/webp-converter) to convert images to `web`
- Use `SVG` formats for icons and logos and everywhere where it’s applicable instead of `png`

## Icons and special characters

- Opening quote: [https://www.compart.com/en/unicode/U+201C](https://www.compart.com/en/unicode/U+201C)
- Closing quote: [https://www.compart.com/en/unicode/U+201D](https://www.compart.com/en/unicode/U+201D)
- Soft hyphen: [https://www.compart.com/en/unicode/U+00AD](https://www.compart.com/en/unicode/U+00AD)

→ You can find more special characters here [https://www.compart.com/en/unicode/](https://www.compart.com/en/unicode/)

→ You can also find icons to use as images or SVGs on this platform [https://fontawesome.com/](https://fontawesome.com/)

## QA your own work-results before submitting a PR for review

- Use the browser device inspect tab and check the design on the following devices
    
    ```
     - iPhone 5/SE
     - Galaxy S5/Moto G4
     - Pixel 2 XL
     - iPhone 6/7/8
     - iPhone 6/7/8 Plus
     - iPhone X, 12, 13 or 14
     - iPad
     - iPad pro
    
    ```
    

# CSS color naming format

## Suffixes

1. `darkest`
2. `darker`
3. `dark`

5. `light`
6. `lighter`
7. `lightest`

## Examples

- Primary
    - `primary-darkest`
    - `primary-darker`
    - `primary-dark`
    - `primary`
    - `primary-light`
    - `primary-lighter`
    - `primary-lightest`

## Types of site names

- `primary`
- `secondary`
- `accent`