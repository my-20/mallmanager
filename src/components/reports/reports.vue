<template>
	<el-card>
		<my-bread level1="数据统计" level2="数据报表"></my-bread>
	<div id="min" style="width: 600px; height: 400px;"> 
		
	</div>
	</el-card>
</template>

<script>
	var echarts = require("echarts");
	export default{
		data(){
			return{};
		},
		mounted(){
			this.useEchart();
		},
		methods:{
			async useEchart(){
				//getElementById() 在mounted()中操作
				var myChart = echarts.init(document.getElementById("min"));
				//获取表格数据
				const res= await this.$http.get("reports/type/1");
				
				let option2 =res.data.data;
				console.log(option2);
				
				//指定图标的配置项和数据
				// let option1= {
				// 	title:{
				// 		text:"堆叠区域图"
				// 	},
				// 	tooltip:{
				// 		trigger:"axis",
				// 		axisPointer:{
				// 			type:"cross",
				// 			label:{
				// 				backgroindColor:'#6a7985'
				// 			}
				// 		}
				// 	},
				// 	toolbox:{
				// 		feature:{
				// 			saveAsImage:{}
				// 		}
				// 	},
				// 	grid:{
				// 		left:"3%",
				// 		right:"4%",
				// 		bottom:"3%",
				// 		containLabel:true
				// 	}
				// };
				
				
				myChart.setOption(option2);
			}
		}
	}
</script>

<style>
</style>
