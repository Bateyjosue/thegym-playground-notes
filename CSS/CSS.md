# CSS Animation

The property applies an animation between styles. it is a shorthand for  

## Spinner Animation Using Keyframes

##### 1. transform: rotate

```html
	<div class="quotes">
	  <h2>I'm obsessed with perfection. I want to work. I don't want to take this for granted, __Drake</h2>
	  <p>__peter</p>
	</div>
	<div class="spinner"></div>
```

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  height: 100dvh;
display: flex;
  justify-content: center;
  align-items: center;
}

body {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.quotes {
  width: 70%;
  text-align: center;
  line-height: 2rem;
}

.quotes p{
  color: gray;
}
.spinner {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 5px ;
	border-bottom: blue solid;
	  border-left: gray solid;
	  border-right: gray solid;
	  border-top: gray solid;
	  animation: loading-spinner .7s linear infinite  forwards ;
  
}

@keyframes loading-spinner{
	  from{
  transform: rotate(0deg)
  }
    
  to{
	  transform: rotate(360deg)
  }
}  
```

#### Preview![[spinner.png]]

##### transform: scale


```html
	<section class="bar">
	  <div></div>
	  <div></div>
	  <div></div>
	</section>
```

```css
	* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 2;
  height: 100dvh;
}
.bar {
  display: flex;
  gap: 5px;
 }

.bar div{
  width: 15px;
  height: 50px;
  
}

.bar div:nth-child(1){
  background: red;
  background: red;
  animation: morph 1s linear .1s infinite;
  transform-origin: center;
}
.bar div:nth-child(2){
  background: green;
  background: red;
  animation: morph 1s linear .2s infinite;
  transform-origin: center;
}
.bar div:nth-child(3){
  background: red;
  animation: morph 1s linear .4s infinite;
  transform-origin: center;
}

@keyframes morph {
  0%{
    transform: scaleY(1)
  }
  25%{
    transform: scaleY(.3)
  }
  50%{
    transform: scaleY(.7)
  }
  75%{
    transform: scaleY(.15)
  }
}
```
**Preview**
![[bars.png]]
