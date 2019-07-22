<template>
	<div id="app">
		<router-view></router-view>
		<!-- <div class="live2d-panel"></div>
		<dialogue v-if="isDialogue" :customDialogue="customDialogue" ref="dialogue"></dialogue>
		<live2d class="live2dBox" v-if="islive2d" :width ="modelWidth " :height="modelheight" :modelPath="modelPath" ref="l2dMange"></live2d>
		<div class="tools-panel"></div> -->
	</div>
</template>

<script>
/* 	import custom from 'live2d-vue/src/custom'
	export default {
		name: 'App',
		 data :()=>({
		modelheight:350,
		modelWidth:200,
	  modelPath: 'http://192.168.1.7:8182/static/live2d-widget-model-shizuku/assets/shizuku.model.json',
	  customDialogue: custom,
	  islive2d: true,
	  isDialogue: false
	}),
	mounted(){
	  setInterval(()=>{
	    fetch('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json')
	      .then(res => res.json())
	      .then(data => {
	        if(!this.isDialogue){
	          let tool = this.$refs.tool.filter(item => { return item.customDialogue })
	          if(tool && tool.length > 0)
	            tool[0].showMessage(data.hitokoto)
	        }else{
	          this.$refs.dialogue.showMessage(data.hitokoto)
	        }
	    })
	  },30000)
	},
	methods:{
	  toolsClick(item){
	    switch(item.tabMsg)
	    {
	      case 'home': 
	        window.open("https://github.com/LingHanChuJian/live2d-vue")
	        break
	      case 'change':
	        // this.$refs.l2dMange.initL2dMange('http://127.0.0.1:8000/media/static/live2d/Pio/model.json')
	        // this.modelPath = 'http://127.0.0.1:8000/media/static/live2d/Pio/model.json'
	        break
	      case 'save':
	        window.Live2D.captureName = `live2d-${Date.now()}.png` 
	        window.Live2D.captureFrame = true
	        break
	      case 'about': 
	        window.open("https://github.com/LingHanChuJian/live2d-vue")
	        break
	      case 'hide': 
	        this.islive2d = false
	        this.toolsDisplay('hide')
	        break
	      case 'show':
	        this.islive2d = true
	        this.toolsDisplay('show')
	        break
	    }
	  },
	  toolsDisplay(display){
	    for(let i=0,len=this.toolsData.length;i<len;i++){
	      let tabMsg =  this.toolsData[i].tabMsg
	      if(display === 'hide'){
	        if(tabMsg === 'home' || tabMsg === 'about')
	          continue
	        this.toolsData[i].show = false
	        if(tabMsg === 'hide'){
	          this.toolsData[i].show = true
	          this.toolsData[i].tabMsg = 'show'
	        }
	      }else{
	        this.toolsData[i].show = true
	        if(tabMsg === 'show')
	          this.toolsData[i].tabMsg = 'hide'
	      }
	    }
	  }
	}
	} */
</script>

<style>
	/* #app {
		position: relative;
	} */
/* 	.tools-panel{
		position: fixed;
		left: 0;
		bottom: 0;
		max-width: 32px;
	}
	.live2d-panel{
		position: fixed;
    left: 0;
    bottom: 0;
	}
	.live2dBox{
		float: right;
		z-index: 999;
	} */
</style>
