import{c as x,s as g}from"./useTrack-Ct2ePmB2.js";import{b as _}from"./useLayer-C8K3weMQ.js";import{d as M,r as b,o as h,n as w,c as y,b as S,e as a,w as n,F as T,f,a as I,g as r}from"./index-jcuMGpNP.js";const N=M({__name:"index8",setup(k){const C=b();let s={},i={};h(()=>{s=x(C.value),g(s,"ARCGIS"),w(()=>{_(s).then(e=>{i=e})})});const m=l=>{switch(l){case 1:var e=i.boundingSphere,t=Cesium.Cartographic.fromCartesian(e.center);const d=Cesium.Cartesian3.fromRadians(t.longitude,t.latitude,0),u=Cesium.Cartesian3.fromRadians(t.longitude,t.latitude,-1420),v=Cesium.Cartesian3.subtract(u,d,new Cesium.Cartesian3);i.modelMatrix=Cesium.Matrix4.fromTranslation(v),s.zoomTo(i,new Cesium.HeadingPitchRange(3.5,-.2,i.boundingSphere.radius*2));break;case 2:let c=JSON.stringify(i.boundingSphere);alert(c);break;default:new Cesium.CustomShader({varyings:{v_normalMC:Cesium.VaryingType.VEC3,v_st:Cesium.VaryingType.VEC3},uniforms:{u_texture:{value:new Cesium.TextureUniform({url:"/materia/result.png"}),type:Cesium.UniformType.SAMPLER_2D},u_texture1:{value:new Cesium.TextureUniform({url:"/materia/result.png"}),type:Cesium.UniformType.SAMPLER_2D}},vertexShaderText:`
            void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
                  v_normalMC = vsInput.attributes.normalMC;
                  v_st=vsInput.attributes.positionMC ;   
            }`,fragmentShaderText:`
           void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec3 positionMC = fsInput.attributes.positionMC;
              //这里是设置要贴图的图片的尺寸，设置小了会重复
              float width = 37.0;
              float height = 40.0;
              vec3 rgb;
              //这是是设置了屋顶的颜色，当和法向量平行时，就是屋顶，这里设置0.95，相当于垂直，建筑物四周开始贴图
              if (dot(vec3(0.0, 1.0, 0.0), v_normalMC) > 0.95) {
                material.diffuse = vec3(1.0, 0.0, 0.0);
              } else {
                float textureX = 0.0;
                float dotYAxis = dot(vec3(0.0, 0.0, 1.0), v_normalMC);
                // cos(45deg) 约等于 0.71，这里是建筑物四周的向量与法向量会大于四十五度夹角
                if (dotYAxis > 0.71 || dotYAxis < -0.71) {
                //x代表的是前后面
                  textureX = mod(positionMC.x, width) / width;
                } else {
                //z代表的是左右面
                  textureX = mod(positionMC.z, width) / width;
                }
                float textureY = mod(positionMC.y, height) / height;
                //我这里是根据建筑物高度贴了两张不同的图片
                if (positionMC.y > 30.0) {
                   rgb = texture(u_texture1, vec2(textureX, textureY)).rgb;       
                } else {
                   rgb = texture(u_texture, vec2(textureX, textureY)).rgb;
                }
                material.diffuse = rgb;
              }
          }`});const p="vec3(0.0, 0, 3)";var o=new Cesium.CustomShader({lightingModel:Cesium.LightingModel.UNLIT,fragmentShaderText:`
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
				{
					vec3 v_positionMC = fsInput.attributes.positionMC;
					float buildMaxHeight = 10.0;//建筑群最高高度 配渐变色
					material.diffuse = ${p};//赋予基础底色
					material.diffuse = ${p}*vec3(v_positionMC.z / buildMaxHeight);//根据楼层高度比例渲染渐变色
					float time = abs(fract(czm_frameNumber / 90.0)-0.5)*2.;//动画频率 约束在(0,1) 更改频率修改360.0
					float diffuse = step(0.03, abs(clamp(v_positionMC.z / buildMaxHeight, 0.0, 2.0) - time));//根据帧数变化,光圈颜色白色,由底部朝上一丢丢(0.05)开始逐渐上移显现.
					material.diffuse += material.diffuse * (0.7 - diffuse );//单纯叠加颜色 感兴趣的可以mix混合下
				}
                `});i.customShader=o;break}};return(l,e)=>{const t=f("v-icon"),o=f("v-btn"),d=f("v-bottom-navigation");return I(),y(T,null,[S("div",{ref_key:"cesiumContainer",ref:C,class:"cesiumContainer"},null,512),a(d,{color:"primary"},{default:n(()=>[a(o,{onClick:e[0]||(e[0]=u=>m(2))},{default:n(()=>[a(t,null,{default:n(()=>[r("mdi-history")]),_:1}),r(" boundingSphere ")]),_:1}),a(o,{onClick:e[1]||(e[1]=u=>m(1))},{default:n(()=>[a(t,null,{default:n(()=>[r("mdi-heart")]),_:1}),r(" 位置纠偏 ")]),_:1}),a(o,{onClick:e[2]||(e[2]=u=>m(3))},{default:n(()=>[a(t,null,{default:n(()=>[r("mdi-heart")]),_:1}),r(" 自定义shader ")]),_:1})]),_:1})],64)}}});export{N as default};
