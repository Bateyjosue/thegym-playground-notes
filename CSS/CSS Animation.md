# CSS Animation

## ****The CSS animation properties****

- **animation-name —** the name of the animation which references an animation created using keyframes
- **animation-duration —** how long the animation should last, in seconds
- **animation-timing-function —** the timing function used by the animation (common values: linear, ease). Default: ease
- **animation-delay —** optional number of seconds to wait before starting the animation
- **animation-iteration-count —** how many times the animation should be performed. Expects a number, or infinite. Default: 1
- **animation-direction —** the direction of the animation. Can be normal, reverse, alternate or alternate-reverse. In the last 2, it alternates going forward and then backwards
- **animation-fill-mode —** defines how to style the element when the animation ends, after it finishes its iteration count number. None or backwards go back to the first keyframe styles. Forwards and both use the style that’s set in the last keyframe
- **animation-play-state —** if set to paused, it pauses the animation. Default is running.

```css
.container {  
	animation: 
		name 
		duration
		timing-function 
		delay 
		iteration-count 
		direction 
		fill-mode 
		play-state;
}

/*Example*/
.container { 
	animation: spin 10s linear infinite;
}
```

## Animation with Transition Property

```css
.ninja1, .ninja2, .ninja3 {
  transition: transform 2s ease-in-out 1s;
}
```

## @keyframes animations

Another way to animate in CSS is with `animation` and `@keyframes` rules.

```css
@keyframes moveDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}
```

# Reference links

[A quick introduction to CSS animations](https://www.freecodecamp.org/news/a-quick-introduction-to-css-animations-a1655375ec90/)

[Introduction to CSS Animations](https://dev.to/ljcdev/introduction-to-css-animation-4762)