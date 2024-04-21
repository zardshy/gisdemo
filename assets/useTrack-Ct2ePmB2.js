var f=Object.defineProperty;var y=(o,t,e)=>t in o?f(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>(y(o,typeof t!="symbol"?t+"":t,e),e);function w(o){window.CESIUM_BASE_URL="/gisdemo/cesium/";const t={geocoder:!1,homeButton:!1,sceneModePicker:!1,baseLayerPicker:!1,navigationHelpButton:!1,animation:!1,CreditsDisplay:!1,timeline:!1,fullscreenButton:!1,vrButton:!1,infoBox:!1,selectionIndicator:!1,shouldAnimate:!0};Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODg0MTkyYS1hMTc4LTQxYWItYjlhMi02ZGE3NjNmYWE3MTgiLCJpZCI6NjU2Miwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0Njg0MjczOX0.1WRFGKH1ZhwBgXc2coUzbp0_IgmF_KkOKmxObu_4ZVQ",Cesium.Camera.DEFAULT_VIEW_RECTANGLE=Cesium.Rectangle.fromDegrees(90,-20,110,90);const e=new Cesium.Viewer(o,t);e.imageryLayers.get(0).show=!1;const n=e.cesiumWidget.creditContainer;return n.style.display="none",e.scene.debugShowFramesPerSecond=!0,e.scene.globe.depthTestAgainstTerrain=!0,e}async function T(o,t){let e=null;o.scene.imageryLayers.removeAll();const n=l=>new Cesium.UrlTemplateImageryProvider(l);switch(t){case"ARCGIS":e=await Cesium.ArcGisMapServerImageryProvider.fromUrl("https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer");break;case"GAODE":e=n({url:"http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"});break;case"OSM":e=n({url:"https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",subdomains:["a","b","c","d"]});break;case"TDT":e=g({layer:"vec",appKey:"1b3cdbba1e25dedbde47e4ec2f53a1bc"});break;case"IMG":e=new Cesium.SingleTileImageryProvider({url:"../IMG/bg.jpg",rectangle:Cesium.Rectangle.fromDegrees(-90,-45,30,45)});break;default:e=n({url:"https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",minimumLevel:0,maximumLevel:15,hue:"3"});break}return o.scene.imageryLayers.addImageryProvider(e)}function g(o){var t="w",e=o.host||"http://t{s}.tianditu.com/",n=["0","1","2","3","4","5","6","7"];e[e.length-1]=="/"&&(e=e.substr(0,e.length-1));var l=e+"/"+o.layer+"_"+t+"/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER="+o.layer+"&tileMatrixSet="+t+"&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles";return l+="&tk="+o.appKey,new Cesium.WebMapTileServiceImageryProvider({url:l,layer:o.layer,style:"default",subdomains:n,tileMatrixSetID:t,maximumLevel:o.maximumLevel||18,minimumLevel:o.minimumLevel})}const C=new Cesium.Material({fabric:{type:"Water",uniforms:{baseWaterColor:Cesium.Color.BLUE.withAlpha(.5),blendColor:Cesium.Color.BLUE,normalMap:"/gisdemo//materia/water.jpg",frequency:100,animationSpeed:.01,amplitude:100,specularIntensity:100}}});new Cesium.MaterialAppearance({material:new Cesium.Material({fabric:{uniforms:{iTime:0,normalMap:"/gisdemo//materia/water.jpg",frequency:100,animationSpeed:.01,amplitude:100,specularIntensity:100},source:`
        const int NUM_STEPS = 8;
      const float PI     = 3.141592;
      const float EPSILON  = 1e-3;
      //#define EPSILON_NRM (0.1 / iResolution.x)
      #define EPSILON_NRM (0.1 / 200.0)
      // sea
      const int ITER_GEOMETRY = 3;
      const int ITER_FRAGMENT = 5;
      const float SEA_HEIGHT = 0.6;
      const float SEA_CHOPPY = 4.0;
      const float SEA_SPEED = 1.8;
      const float SEA_FREQ = 0.16;
      const vec3 SEA_BASE = vec3(0.1,0.19,0.22);
      const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6);
      //#define SEA_TIME (1.0 + iTime * SEA_SPEED)
      const mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);
      // math
      mat3 fromEuler(vec3 ang) {
        vec2 a1 = vec2(sin(ang.x),cos(ang.x));
        vec2 a2 = vec2(sin(ang.y),cos(ang.y));
        vec2 a3 = vec2(sin(ang.z),cos(ang.z));
        mat3 m;
        m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
        m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
        m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
        return m;
      }
      float hash( vec2 p ) {
        float h = dot(p,vec2(127.1,311.7));
        return fract(sin(h)*43758.5453123);
      }
      float noise( in vec2 p ) {
        vec2 i = floor( p );
        vec2 f = fract( p );
        vec2 u = f*f*(3.0-2.0*f);
        return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ),
                 hash( i + vec2(1.0,0.0) ), u.x),
              mix( hash( i + vec2(0.0,1.0) ),
                 hash( i + vec2(1.0,1.0) ), u.x), u.y);
      }
      // lighting
      float diffuse(vec3 n,vec3 l,float p) {
        return pow(dot(n,l) * 0.4 + 0.6,p);
      }
      float specular(vec3 n,vec3 l,vec3 e,float s) {
        float nrm = (s + 8.0) / (PI * 8.0);
        return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
      }
      // sky
      vec3 getSkyColor(vec3 e) {
        e.y = max(e.y,0.0);
        return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4);
      }
      // sea
      float sea_octave(vec2 uv, float choppy) {
        uv += noise(uv);
        vec2 wv = 1.0-abs(sin(uv));
        vec2 swv = abs(cos(uv));
        wv = mix(wv,swv,wv);
        return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
      }
      float map(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float d, h = 0.0;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        for(int i = 0; i < ITER_GEOMETRY; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      float map_detailed(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        float d, h = 0.0;
        for(int i = 0; i < ITER_FRAGMENT; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
        float fresnel = clamp(1.0 - dot(n,-eye), 0.0, 1.0);
        fresnel = pow(fresnel,3.0) * 0.65;
        vec3 reflected = getSkyColor(reflect(eye,n));
        vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12;
        vec3 color = mix(refracted,reflected,fresnel);
        float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
        color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
        color += vec3(specular(n,l,eye,60.0));
        return color;
      }
      // tracing
      vec3 getNormal(vec3 p, float eps) {
        vec3 n;
        n.y = map_detailed(p);
        n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
        n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
        n.y = eps;
        return normalize(n);
      }
      float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
        float tm = 0.0;
        float tx = 1000.0;
        float hx = map(ori + dir * tx);
        if(hx > 0.0) return tx;
        float hm = map(ori + dir * tm);
        float tmid = 0.0;
        for(int i = 0; i < NUM_STEPS; i++) {
          tmid = mix(tm,tx, hm/(hm-hx));
          p = ori + dir * tmid;
          float hmid = map(p);
          if(hmid < 0.0) {
            tx = tmid;
            hx = hmid;
          } else {
            tm = tmid;
            hm = hmid;
          }
        }
        return tmid;
      }
           vec4 czm_getMaterial(vec2 vUv)
           {
            vec2 uv = vUv;
            uv = vUv * 2.0 - 1.0;
            float time = iTime * 0.3 + 0.0*0.01;
            // ray
            vec3 ang = vec3(0, 1.2, 0.0);
              vec3 ori = vec3(0.0,3.5,0);
            vec3 dir = normalize(vec3(uv.xy,-2.0)); dir.z += length(uv) * 0.15;
            dir = normalize(dir) * fromEuler(ang);
            // tracing
            vec3 p;
            heightMapTracing(ori,dir,p);
            vec3 dist = p - ori;
            vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
            vec3 light = normalize(vec3(0.0,1.0,0.8));
            // color
            vec3 color = mix(
              getSkyColor(dir),
              getSeaColor(p,n,light,dir,dist),
              pow(smoothstep(0.0,-0.05,dir.y),0.3));
               return vec4( pow(color,vec3(0.75)), 1.0 );
           }
        `}}),translucent:!0,vertexShaderSource:`
        in vec3 position3DHigh;
        in vec3 position3DLow;
        in float batchId;
        in vec2 st;
        in vec3 normal;
        out vec2 v_st;
        out vec3 v_positionEC;
        out vec3 v_normalEC;
        void main() {
            v_st = st;
            vec4 p = czm_computePosition();
            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
            v_normalEC = czm_normal * normal;                         // normal in eye coordinates
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }
                    `,fragmentShaderSource:`
        in vec2 v_st;
        in vec3 v_positionEC;
        in vec3 v_normalEC;
        void main()  {
            vec3 positionToEyeEC = -v_positionEC;
            vec3 normalEC = normalize(v_normalEC);
            czm_materialInput materialInput;
            materialInput.normalEC = normalEC;
            materialInput.positionToEyeEC = positionToEyeEC;
            materialInput.st = v_st;
            vec4 color = czm_getMaterial(v_st);
            out_FragColor = color;
        }
                `});function M(o,t){const e=new Cesium.Primitive({show:!0,geometryInstances:new Cesium.GeometryInstance({geometry:new Cesium.PolygonGeometry({polygonHierarchy:new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(t)),vertexFormat:Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,extrudedHeight:0,height:30})}),appearance:new Cesium.EllipsoidSurfaceAppearance({material:C}),asynchronous:!1});o.scene.primitives.add(e)}class h{constructor(t,e){r(this,"duration");r(this,"_color");r(this,"color");r(this,"_time");r(this,"_definitionChanged");this.duration=t,this._color=void 0,this.color=e,this._time=new Date().getTime(),this._definitionChanged=new Cesium.Event,this.init()}init(){Cesium.Material.PolylineTrailLinkType="PolylineTrailLink",Cesium.Material.PolylineTrailLinkImage="/gisdemo//materia/spriteline.png",Cesium.Material.PolylineTrailLinkSource=`czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;
                    vec4 colorImage = texture(image, vec2(fract(st.s - time), st.t));
                    material.alpha = colorImage.a * color.a;
                    material.diffuse = (colorImage.rgb+color.rgb)/2.0;
                    return material;
                }`,Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType,{fabric:{type:Cesium.Material.PolylineTrailLinkType,uniforms:{color:new Cesium.Color(1,0,0,1),image:Cesium.Material.PolylineTrailLinkImage,time:50},source:Cesium.Material.PolylineTrailLinkSource},translucent:function(t){return!0}})}getType(){return"PolylineTrailLink"}getValue(t,e){return Cesium.defined(e)||(e={}),e.color=Cesium.Property.getValueOrClonedDefault(this._color,t,Cesium.Color.WHITE,e.color),e.image=Cesium.Material.PolylineTrailLinkImage,e.time=(new Date().getTime()-this._time)%this.duration/this.duration,e}equals(t){return this===t||t instanceof h&&Cesium.Property.equals(this._color,t._color)}get isConstant(){return!1}get definitionChanged(){return this._definitionChanged}}Object.defineProperties(h.prototype,{color:Cesium.createPropertyDescriptor("color")});class v{constructor(t,e){r(this,"duration");r(this,"_color");r(this,"color");r(this,"_time");r(this,"_definitionChanged");this.duration=t,this._color=void 0,this.color=e,this._time=new Date().getTime(),this._definitionChanged=new Cesium.Event,this.init()}init(){Cesium.Material.DynamicWallMaterialProperty="DynamicWallMaterialProperty",Cesium.Material.WallImage1="/gisdemo//materia/colors.png",Cesium.Material.WallImage2="/gisdemo//materia/polylineTrailLinkMaterial.png",Cesium.Material.WallSource=`czm_material czm_getMaterial(czm_materialInput materialInput)
        {
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            vec4 colorImage = texture(image, vec2(0.8-st.t, st.s));
            vec4 colorImage2 = texture(image2, vec2(st.s, fract(st.t*1.0- time)));
            material.alpha = colorImage.a * color.a + 0.5*colorImage2.r;
            material.diffuse = color.rgb;
            material.emission = vec3(0.4);
            return material;
        }`,Cesium.Material._materialCache.addMaterial(Cesium.Material.DynamicWallMaterialProperty,{fabric:{type:Cesium.Material.DynamicWallMaterialProperty,uniforms:{color:new Cesium.Color(.5,.5,.5,1),image:Cesium.Material.WallImage1,image2:Cesium.Material.WallImage2,time:0},source:Cesium.Material.WallSource},translucent:function(t){return t.uniforms.color.alpha<=1}})}getType(){return"DynamicWallMaterialProperty"}getValue(t,e){return Cesium.defined(e)||(e={}),e.color=n((new Date().getTime()-this._time)%(this.duration*35)/(this.duration*35)),e.time=(new Date().getTime()-this._time)/this.duration,e;function n(l){var a=l,s=1,c=1,m=1;return a>=0&&a<.14?(c=a/.28,m=0):a>=.14&&a<.28?(c=(a-.14)/.28+.5,m=0):a>=.28&&a<.42?(s=1-(a-.28)/.14,m=0):a>=.42&&a<.56?(s=0,m=(a-.42)/.14):a>=.56&&a<.7?(s=0,c=1-(a-.56)/.14):a>=.7&&a<.84?(s=(a-.7)/.14,c=0):a>=.84&&a<1&&(c=0,m=1-(a-.84)/.16),s=s>1?1:s,c=c>1?1:c,m=m>1?1:m,new Cesium.Color(s,c,m)}}equals(t){return this===t||t instanceof v&&Cesium.Property.equals(this._color,t._color)}}Object.defineProperties(v.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}},color:Cesium.createPropertyDescriptor("color")});class d{constructor(t){r(this,"_definitionChanged");r(this,"_color");r(this,"_speed");r(this,"_percent");r(this,"_gradient");r(this,"color");r(this,"speed");r(this,"percent");r(this,"gradient");this._definitionChanged=new Cesium.Event,this._color=void 0,this._speed=void 0,this._percent=void 0,this._gradient=void 0,this.color=t.color,this.speed=t.speed,this.percent=t.percent,this.gradient=t.gradient}get isConstant(){return!1}get definitionChanged(){return this._definitionChanged}getType(t){return Cesium.Material.LineFlowMaterialType}getValue(t,e){return Cesium.defined(e)||(e={}),e.color=Cesium.Property.getValueOrDefault(this._color,t,Cesium.Color.RED,e.color),e.speed=Cesium.Property.getValueOrDefault(this._speed,t,5,e.speed),e.percent=Cesium.Property.getValueOrDefault(this._percent,t,.1,e.percent),e.gradient=Cesium.Property.getValueOrDefault(this._gradient,t,.01,e.gradient),e}equals(t){return this===t||t instanceof d&&Cesium.Property.equals(this._color,t._color)&&Cesium.Property.equals(this._speed,t._speed)&&Cesium.Property.equals(this._percent,t._percent)&&Cesium.Property.equals(this._gradient,t._gradient)}}Object.defineProperties(d.prototype,{color:Cesium.createPropertyDescriptor("color"),speed:Cesium.createPropertyDescriptor("speed"),percent:Cesium.createPropertyDescriptor("percent"),gradient:Cesium.createPropertyDescriptor("gradient")});Cesium.Material.LineFlowMaterialProperty="LineFlowMaterialProperty";Cesium.Material.LineFlowMaterialType="LineFlowMaterialType";Cesium.Material.LineFlowMaterialSource=`
    uniform vec4 color;
    uniform float speed;
    uniform float percent;
    uniform float gradient;
    
    czm_material czm_getMaterial(czm_materialInput materialInput){
      czm_material material = czm_getDefaultMaterial(materialInput);
      vec2 st = materialInput.st;
      float t =fract(czm_frameNumber * speed / 1000.0);
      t *= (1.0 + percent);
      float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
      alpha += gradient;
      material.diffuse = color.rgb;
      material.alpha = alpha;
      return material;
    }
    `;Cesium.Material._materialCache.addMaterial(Cesium.Material.LineFlowMaterialType,{fabric:{type:Cesium.Material.LineFlowMaterialType,uniforms:{color:new Cesium.Color(1,0,0,1),speed:10,percent:.1,gradient:.01},source:Cesium.Material.LineFlowMaterialSource},translucent:function(o){return!0}});function _(o,t){let e=[];for(let n=0;n<t;n++){let l=o[0]+Math.random()*.04*(n%2==0?1:-1),a=o[1]+Math.random()*.04*(n%2==0?1:-1);e.push([l,a])}return e}function P(o,t,e){_(t,e).forEach(l=>{let a=l[0],s=l[1],c=new Cesium.Cartesian3.fromDegrees(a,s,0),m=5e3*Math.random(),u=new Cesium.Cartesian3.fromDegrees(a,s,m),p=[];p.push(c),p.push(u),o.entities.add({polyline:{positions:p,material:new d({color:new Cesium.Color(1,1,0,.8),speed:15*Math.random(),percent:.1,gradient:.01})}})})}const i=Cesium;class I{constructor(t){r(this,"viewer");r(this,"pathPositions");r(this,"handleEntity");r(this,"startTime");r(this,"stopTime");r(this,"entityRunTime");r(this,"multiplier",.5);r(this,"ifPathLine",!1);r(this,"ifPathPoint",!1);const{viewer:e,pathArr:n,entity:l,runTime:a,ifPathLine:s,ifPathPoint:c}=t;this.viewer=e,this.pathPositions=n,this.handleEntity=l,this.entityRunTime=a,typeof s<"u"&&(this.ifPathLine=s),typeof c<"u"&&(this.ifPathPoint=c),this._init()}_init(){i.Math.setRandomNumberSeed(888),this._setTimeExtent(),this._setProperty(),this._setInterpolation(1),this.sideView()}_setTimeExtent(){this.startTime=i.JulianDate.fromDate(new Date),this.stopTime=i.JulianDate.addSeconds(this.startTime,360,new i.JulianDate),this.stopTime=i.JulianDate.addSeconds(this.startTime,360,new i.JulianDate),this.viewer.clock.startTime=this.startTime.clone(),this.viewer.clock.currentTime=this.startTime.clone(),this.viewer.clock.stopTime=this.stopTime.clone(),this.viewer.clock.multiplier=this.multiplier,this.viewer.clock.clockStep=i.ClockStep.SYSTEM_CLOCK_MULTIPLIER,this.viewer.clock.clockRange=i.ClockRange.LOOP_STOP}_getProperty(){const t=new i.SampledPositionProperty;return this.pathPositions.forEach((e,n)=>{const l=i.JulianDate.addSeconds(this.entityRunTime,n,new i.JulianDate),a=i.Cartesian3.fromDegrees(e.lng,e.lat,e.alt);t.addSample(l,a),n===this.pathPositions.length-1&&(this.viewer.clock.stopTime=i.JulianDate.addSeconds(this.entityRunTime,n,new i.JulianDate)),this.ifPathPoint&&this.viewer.entities.add({position:a,point:{pixelSize:8,color:i.Color.TRANSPARENT,outlineColor:i.Color.RED,outlineWidth:3}})}),t}_setProperty(){const t=this._getProperty();this.handleEntity.availability=new i.TimeIntervalCollection([new i.TimeInterval({start:this.startTime,stop:this.stopTime})]),this.handleEntity.position=t,this.handleEntity.orientation=new i.VelocityOrientationProperty(t),this.ifPathLine&&(this.handleEntity.path={resolution:.1,material:new i.PolylineGlowMaterialProperty({glowPower:.1,color:i.Color.YELLOW}),width:3})}_setInterpolation(t){switch(t){case 1:this.handleEntity.position.setInterpolationOptions({interpolationDegree:1,interpolationAlgorithm:i.LinearApproximation});break;case 2:this.handleEntity.position.setInterpolationOptions({interpolationDegree:5,interpolationAlgorithm:i.LagrangePolynomialApproximation});break;case 3:this.handleEntity.position.setInterpolationOptions({interpolationDegree:2,interpolationAlgorithm:i.HermitePolynomialApproximation});break}}_followCameraCallBack(){function t(n,l,a){let s=new i.Matrix3,c=new i.Cartesian3,m=new i.Quaternion,u=i.Property.getValueOrUndefined(n.position,l,c);if(!i.defined(u))return;let p=i.Property.getValueOrUndefined(n.orientation,l,m);return i.defined(p)?a=i.Matrix4.fromRotationTranslation(i.Matrix3.fromQuaternion(p,s),u,a):a=i.Transforms.eastNorthUpToFixedFrame(u,void 0,a),a}let e=new i.Matrix4;t(this.handleEntity,this.viewer.clock.currentTime,e),this.viewer.scene.camera.lookAtTransform(e,new i.Cartesian3(-50,0,10))}_changeCameraMode(t){switch(this.removeFollowCamera(),t){case 1:this.viewer.scene.preRender.addEventListener(this._followCameraCallBack,this);break;case 3:this.viewer.camera.lookAtTransform(i.Matrix4.IDENTITY),this.viewer.trackedEntity=this.handleEntity;break}}play(){this.viewer.clock.shouldAnimate=!0}pause(){this.viewer.clock.shouldAnimate=!1}firstPerson(){this._changeCameraMode(1)}thirdPerson(){this._changeCameraMode(3)}topView(){this.viewer.trackedEntity=void 0,this.viewer.zoomTo(this.viewer.entities,new i.HeadingPitchRange(0,i.Math.toRadians(-90)))}sideView(){this.viewer.trackedEntity=void 0,this.viewer.zoomTo(this.viewer.entities,new i.HeadingPitchRange(i.Math.toRadians(-90),i.Math.toRadians(-15),12500))}removeFollowCamera(){this.viewer.trackedEntity=void 0,this.viewer.camera.lookAtTransform(i.Matrix4.IDENTITY),this.viewer.scene.preRender.removeEventListener(this._followCameraCallBack,this)}}export{v as D,h as P,I as T,w as c,P as l,T as s,M as u};
