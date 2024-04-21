async function d(s){try{const i="vec3(0.0, 0.5, 3)",t=await Cesium.Cesium3DTileset.fromUrl("/gisdemo//models/3dtiles/sh150/tileset.json",{customShader:new Cesium.CustomShader({lightingModel:Cesium.LightingModel.UNLIT,fragmentShaderText:`
				void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
				{
					vec3 v_positionMC = fsInput.attributes.positionMC;
					float buildMaxHeight = 180.0;//建筑群最高高度 配渐变色
					material.diffuse = ${i};//赋予基础底色
					material.diffuse = ${i}*vec3(v_positionMC.z / buildMaxHeight);//根据楼层高度比例渲染渐变色
					float time = abs(fract(czm_frameNumber / 90.0)-0.5)*2.;//动画频率 约束在(0,1) 更改频率修改360.0
					float diffuse = step(0.03, abs(clamp(v_positionMC.z / buildMaxHeight, 0.0, 2.0) - time));//根据帧数变化,光圈颜色白色,由底部朝上一丢丢(0.05)开始逐渐上移显现.
					material.diffuse += material.diffuse * (0.7 - diffuse );//单纯叠加颜色 感兴趣的可以mix混合下
				}
				`})});s.scene.primitives.add(t);var n=t.boundingSphere,e=Cesium.Cartographic.fromCartesian(n.center);const r=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,0),m=Cesium.Cartesian3.fromRadians(e.longitude,e.latitude,30),o=Cesium.Cartesian3.subtract(m,r,new Cesium.Cartesian3);t.modelMatrix=Cesium.Matrix4.fromTranslation(o)}catch(i){console.log(`Error loading tileset: ${i}`)}}async function f(s){var n=121.8252503,e=30.9215641,i=0,t=0,r=Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(n,e,i));Cesium.Matrix4.multiplyByMatrix3(r,Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(t)),r);try{const u="vec3(0.0, 0.5, 3)",a=await Cesium.Cesium3DTileset.fromUrl("/gisdemo//models/3dtiles/cs3dt/tileset.json",{});s.scene.primitives.add(a);var m=a.boundingSphere,o=Cesium.Cartographic.fromCartesian(m.center);const l=Cesium.Cartesian3.fromRadians(o.longitude,o.latitude,0);return s.zoomTo(a,new Cesium.HeadingPitchRange(4,-.2,a.boundingSphere.radius*3)),a}catch(u){console.log(`Error loading tileset: ${u}`)}}export{d as a,f as b};
