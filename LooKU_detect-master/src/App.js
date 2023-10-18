// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';
// import storage from './storage.js';
// import React, { useRef } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import CameraComponent from './component/CameraComponent';
import ResultPage from './component/ResultPage';
import './style.css';


// const history = createBrowserHistory();

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<CameraComponent />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </>
   );
//   const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
//   const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const cameraRef = useRef(null);
//   const [predictionResult, setPredictionResult] = useState('');
//   const [locationResult, setLocationResult] = useState(null);
//   const alist=[];
//   const detectList=[];
//   const locationList=[];

//   useEffect(() => {
//     (async () => {
//       //카메라 권한
//       const { status:cameraStatus } = await Camera.requestCameraPermissionsAsync();
//       setHasPermissionCamera(cameraStatus === 'granted');

//       //위치 권한
//       let {status:locationStatus} = await Location.requestForegroundPermissionsAsync();
//       if (locationStatus !== 'granted') {
//         console.log('No access to location');
//         return;
//       }
//       setHasPermissionLocation(true);
//     })();
//   }, []);

//   useEffect(() => {
//     if (hasPermissionLocation) {
//       (async () => {
//         try {
//           let locationData = await Location.getCurrentPositionAsync({});
//           setLocationResult(locationData.coords);

//           // 사용자의 위치와 건물 정보 비교하기
//           const buildingsInRange = checkUserBuilding(locationData.coords.latitude, locationData.coords.longitude);

//           console.log('현재 위치:',locationData.coords.latitude + ', ' + locationData.coords.longitude);
          
//           if (buildingsInRange.length > 0) {
//             console.log('현재 위치에 속한 건물:');
//             for (let i in buildingsInRange) {
//               console.log(buildingsInRange[i].name);
//               locationList.push(buildingsInRange[i].name);
//             }
//           } else {
//             console.log('현재 속한 건물이 없습니다.');
//           }

//         } catch (error) {
//           console.log('Error getting location:', error);
//         }
        
        
//       })();
//     }
//   }, [hasPermissionLocation]);

//   const handleCameraType = () => {
//     setCameraType(
//       cameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const takePictureHandler = async () => {
//     if (!hasPermissionCamera || !hasPermissionLocation) return;

//     if (cameraRef.current) {
//       try {
//         // 현재 위치 정보 확인
//         if (!locationResult) {
//           console.log('Location information is not available.');
//           return;
//         }

//         //현재 위치 정보 갖고오기
//         let currentLocationText =
//            `Latitude: ${locationResult.latitude}, Longitude: ${locationResult.longitude}`;
//          console.log('촬영 위치:', currentLocationText);
        
//          //이미지
//         const photoData = await cameraRef.current.takePictureAsync({ base64: true });
        
//         // 서버로 사진 데이터 전송 및 예측 결과 받기
//         const predictionResults = await sendPhotoToServer(photoData.base64);
        
//         if (predictionResults && predictionResults.predictions) {
//           const predictedNames = predictionResults.predictions.map((prediction) => prediction.name);
    
//           console.log('인식된 건물명:', predictedNames);
    
//           const filteredBuildings = storage.productData.filter((building) =>
//             predictedNames.includes(building.number)
//           );
    
//           console.log('현재 이미지에 속한 건물:');
//           filteredBuildings.forEach((building) => {
//             console.log(building.name);
//             detectList.push(building.name);
//             // 필요한 경우, 해당 건물의 다른 정보를 활용할 수 있습니다.
//           });

          
          
          
//           console.log('-------------------');
//           const final = locationList.filter((name)=>detectList.includes(name));
//           console.log('위치: ',locationList);
//           console.log('이미지: ',detectList);
//           console.log('최종결과 :',final);

//           setPredictionResult(final);
//         }
    
//       } catch (error) {
//         console.log('Error taking picture:', error);
//       }
//     }
//   };
//   const sendPhotoToServer = async (base64Data) => {
//     try {
//       // API 엔드포인트 URL 설정
//       const apiUrl = 'http://192.168.0.105:6000'; //서버 호스팅 시 주소 바꿀 것
      
//       // 서버로 전송할 데이터 객체 생성
//       const dataToSend = { image: base64Data };
      
//       // POST 요청으로 데이터 전송 및 응답 받기
//       const response = await fetch(apiUrl + '/predict', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(dataToSend)
//      });

//      if (!response.ok) throw new Error('Failed to send photo to server.');

//      // 응답 데이터 처리
//      const resultData = await response.json();

//      console.log(resultData);
     
//      if (resultData && resultData.predictions){
//       const names = resultData.predictions.map((prediction)=>prediction.name);
//       const confidences = resultData.predictions.map((prediction)=>prediction.confidence);
      
//       console.log('건물 명: ', names);
//       alist.push(names);
//       console.log('인식률: ',confidences);

//       return resultData;
//     }
     
//      // 결과를 활용하여 화면에 표시하거나 추가 작업 수행
     
//    } catch (error) {
//      console.log('Error sending photo to server:', error);
//    }
//  };
 
//  // 사용자의 위치와 건물 정보 비교하여 현재 어느 건물 범위에 있는지 확인하는 함수
//  const checkUserBuilding = (latitude, longitude) => {
//   const buildingsInRange=[];

//   for (let i in storage.productData) {
//     let buildingInfo = storage.productData[i];

//     // 현재 사용자의 위치가 해당 건물 범위 내에 있는지 확인하기
//     if (
//       latitude >= buildingInfo.minLatitude &&
//       latitude <= buildingInfo.maxLatitude &&
//       longitude >= buildingInfo.minLongitude &&
//       longitude <= buildingInfo.maxLongitude
//     ) {
//       buildingsInRange.push(buildingInfo);
//     }
//   }

//   return buildingsInRange;
//   };

//  if (!hasPermissionCamera || !hasPermissionLocation) return <View />;
// //  if (hasPermission === null) return <View />;
//  if (!hasPermissionCamera) return <Text>No access to camera</Text>;

//  return (
//    <View style={styles.container}>
//      <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
//      <TouchableOpacity style={styles.button} onPress={handleCameraType}>
//        <Text style={styles.buttonText}>Flip</Text>
//      </TouchableOpacity>
//      <TouchableOpacity style={styles.button} onPress={takePictureHandler}>
//        <Text style={styles.buttonText}>Take Picture</Text>
//      </TouchableOpacity>

//      {/* 예측 결과 출력 */}
//      {!!predictionResult && (
//        <View style={styles.predictionContainer}>
//          <Text>Prediction Result:</Text>
//          {predictionResult.map((prediction, index) => (
//            <View key={`prediction_${index}`}>
//              {/* 필요한 정보 추출 */}
//              <Text>Class: {prediction.class}</Text>
//              {/* 경계 상자 등 다른 정보도 여기서 활용 가능 */}
//            </View>
//          ))}
//        </View>
//      )}
     
//    </View>
//  );
}

// const styles = StyleSheet.create({
//  container: {
//    flex:1,
//    backgroundColor:'#fff',
//  },
//  camera: {
//    flex:1,
//  },
//  buttonContainer:{
//    position:'absolute',
//  },
//  button:{
//    paddingVertical:10,
//  },
//  buttonText:{
//  fontSize:18,
//  fontWeight:'bold',
//  color:'black'
// },
//  predictionContainer:{
//  marginTop:'auto',
//  backgroundColor:'#fff',
//  paddingVertical:20,
//  paddingHorizontal:10,
// },
// });
