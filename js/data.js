var geoJson = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {"type": "currentLocation", "resourceType": "medic vehicle"},
    "geometry": {"type": "Point", "coordinates": [1.45286, 43.552724]},
    "id": "medic+vehicle-1-1430999136320"
  }, {
    "type": "Feature",
    "properties": {"type": "currentLocation", "resourceType": "medic vehicle"},
    "geometry": {"type": "Point", "coordinates": [1.43194, 43.600344]},
    "id": "medic+vehicle-2-1430999136324"
  }, {
    "type": "Feature",
    "properties": {
      "taskLocations": ["Rangueil", "rvpa-0"],
      "taskStatus": "toPickup",
      "type": "currentLocation",
      "taskTitle": "Proceed to rendezvous point",
      "resourceType": "medic vehicle"
    },
    "geometry": {"type": "Point", "coordinates": [1.410690957166069, 43.6019647460414]},
    "id": "medic+vehicle-0-1430999136295"
  }, {
    "type": "Feature",
    "properties": {
      "taskLocations": ["Rangueil", "rvpa-0"],
      "eta": "2015-05-07T11:55:14.775Z",
      "etaShort": "11:55:14",
      "taskStatus": "toPickup",
      "targetId": "rvpa-0",
      "type": "targetLocation",
      "timeRemaining": "6:00",
      "taskTitle": "Proceed to rendezvous point",
      "resourceType": "medic vehicle"
    },
    "geometry": {"type": "Point", "coordinates": [1.424318, 43.569079]},
    "id": "medic+vehicle-0-1430999136295"
  }]
};

var poi = {
  "type": "FeatureCollection",
  "properties": {"id": "PointsOfInterest"},
  "features": [{
    "type": "Feature",
    "properties": {
      "icon": "command_control_coordination_communication_sites/incident_command_post_police_fire_and_ambulance.svg",
      "type": "commandPost"
    },
    "geometry": {"type": "Point", "coordinates": [1.423707, 43.556492]},
    "id": "cp-1"
  }, {
    "type": "Feature",
    "properties": {
      "icon": "command_control_coordination_communication_sites/gold_command_post_police_fire_and_ambulance.svg",
      "type": "commandPost"
    },
    "geometry": {"type": "Point", "coordinates": [1.423411, 43.568942]},
    "id": "cp-2"
  }, {
    "type": "Feature",
    "properties": {"icon": "assets/rendevous_point_ambulance.svg", "type": "rvpAmbu"},
    "geometry": {"type": "Point", "coordinates": [1.424318, 43.569079]},
    "id": "rvpa-0"
  }, {
    "type": "Feature",
    "properties": {"icon": "assets/rendevous_point_ambulance.svg", "type": "rvpAmbu"},
    "geometry": {"type": "Point", "coordinates": [1.42449, 43.559548]},
    "id": "rvpa-1"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.431868, 43.597184]},
    "id": "policeStation-1"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.412553, 43.579855]},
    "id": "policeStation-2"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.45667, 43.571616]},
    "id": "policeStation-3"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.400537, 43.565397]},
    "id": "policeStation-4"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.462464, 43.610998]},
    "id": "policeStation-5"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "policeStation"},
    "geometry": {"type": "Point", "coordinates": [1.48375, 43.578798]},
    "id": "policeStation-6"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "fireStation"},
    "geometry": {"type": "Point", "coordinates": [1.455619, 43.595087]},
    "id": "fireStation-1"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "fireStation"},
    "geometry": {"type": "Point", "coordinates": [1.355983, 43.593078]},
    "id": "fireStation-2"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "fireStation"},
    "geometry": {"type": "Point", "coordinates": [1.473571, 43.554649]},
    "id": "fireStation-3"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "fireStation"},
    "geometry": {"type": "Point", "coordinates": [1.432859, 43.594798]},
    "id": "fireStation-4"
  }, {
    "type": "Feature",
    "properties": {"icon": "null", "type": "fireStation"},
    "geometry": {"type": "Point", "coordinates": [1.464916, 43.60005]},
    "id": "fireStation-5"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.428539, 43.570415]},
    "id": "rb-1"
  }, {
    "type": "Feature",
    "properties": {"icon": "cordons_zones_areas/scene_access_control_point_black_and_white.svg", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.424354, 43.569847]},
    "id": "rb-2"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.435995, 43.572156]},
    "id": "rb-3"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.422178, 43.563294]},
    "id": "rb-4"
  }, {
    "type": "Feature",
    "properties": {"icon": "cordons_zones_areas/scene_access_control_point_black_and_white.svg", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.424631, 43.559758]},
    "id": "rb-5"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.431684, 43.557258]},
    "id": "rb-6"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.410907, 43.554105]},
    "id": "rb-7"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.420585, 43.549564]},
    "id": "rb-8"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/road_block.png", "type": "roadblock"},
    "geometry": {"type": "Point", "coordinates": [1.423846, 43.559564]},
    "id": "rb-9"
  }, {
    "type": "Feature",
    "properties": {"icon": "assets/rendevous_point_fire.svg", "type": "rvpFire"},
    "geometry": {"type": "Point", "coordinates": [1.424404, 43.56726]},
    "id": "rvpf-0"
  }, {
    "type": "Feature",
    "properties": {"icon": "assets/rendevous_point_fire.svg", "type": "rvpFire"},
    "geometry": {"type": "Point", "coordinates": [1.426443, 43.563031]},
    "id": "rvpf-1"
  }, {
    "type": "Feature",
    "properties": {"icon": "infrastructures/hospital_green.svg", "type": "hospital"},
    "geometry": {"type": "Point", "coordinates": [1.452668, 43.559601]},
    "id": "Rangueil"
  }, {
    "type": "Feature",
    "properties": {"icon": "infrastructures/hospital_green.svg", "type": "hospital"},
    "geometry": {"type": "Point", "coordinates": [1.400976, 43.610032]},
    "id": "Purpan"
  }, {
    "type": "Feature",
    "properties": {"icon": "infrastructures/hospital_green.svg", "type": "hospital"},
    "geometry": {"type": "Point", "coordinates": [1.43194, 43.600344]},
    "id": "La Grave"
  }, {
    "type": "Feature",
    "properties": {"icon": "infrastructures/hospital_green.svg", "type": "hospital"},
    "geometry": {"type": "Point", "coordinates": [1.45286, 43.552724]},
    "id": "Larrey"
  }, {
    "type": "Feature",
    "properties": {"icon": "infrastructures/hospital_red.svg", "type": "damagedHospital"},
    "geometry": {"type": "Point", "coordinates": [1.420396, 43.560099]},
    "id": "Marchant"
  }, {
    "type": "Feature",
    "properties": {"icon": "incidents_hazards/fire.svg", "type": "incident"},
    "geometry": {"type": "Point", "coordinates": [1.427344, 43.567]},
    "id": "AZF fire/explosion"
  }]
};

var geoJSONTrack = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {"type": "currentLocation", "resourceType": "medic vehicle"},
    "geometry": {"type": "Point", "coordinates": [1.45286, 43.552724]},
    "id": "medic+vehicle-1-1430999136320"
  }, {
    "type": "Feature",
    "properties": {"type": "currentLocation", "resourceType": "medic vehicle"},
    "geometry": {"type": "Point", "coordinates": [1.43194, 43.600344]},
    "id": "medic+vehicle-2-1430999136324"
  }, {
    "type": "Feature",
    "properties": {
      "taskLocations": ["Rangueil", "rvpa-0"],
      "taskStatus": "toPickup",
      "type": "currentLocation",
      "taskTitle": "Proceed to rendezvous point",
      "resourceType": "medic vehicle"
    },
    "geometry": {"type": "Point", "coordinates": [1.4196594263641003, 43.59688786979861]},
    "id": "medic+vehicle-0-1430999136295"
  }, {
    "type": "Feature",
    "properties": {
      "taskLocations": ["Rangueil", "rvpa-0"],
      "taskStatus": "toPickup",
      "type": "route",
      "taskTitle": "Proceed to rendezvous point",
      "resourceType": "medic vehicle"
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [[1.4196594263641003, 43.59688786979861], [1.4195567314227684, 43.59627277246727], [1.4194492567952557, 43.59593842765551], [1.4194293264917133, 43.595852187183176], [1.41938518180069, 43.59578140666592], [1.4194097687172094, 43.59572515478116], [1.4194388259821868, 43.595703920625986], [1.4193564970647505, 43.59536845822711], [1.4193518404517733, 43.59498438078875], [1.4190744925828538, 43.59326776698085], [1.4190411512339371, 43.59281868322533], [1.4189545382325621, 43.59258268607965], [1.4189582635229439, 43.59241225404469], [1.4188688565537824, 43.591699792259185], [1.4189057369285614, 43.591505890894815], [1.4189962614848375, 43.59140009264797], [1.4190465529049907, 43.59133154730495], [1.4190752376409301, 43.59128852020104], [1.4191253427965642, 43.59124009142608], [1.4192160536173595, 43.59113727341154], [1.4218997528083568, 43.58939253366126], [1.423104884246846, 43.58863033924916], [1.4232043495000382, 43.5885195118603], [1.4234738742591562, 43.588338649012265], [1.4237076362306096, 43.588198391829394], [1.423867823717024, 43.58813413057031], [1.4247395416663484, 43.587554289122394], [1.4273923209471775, 43.58584605721785], [1.4279250374717647, 43.58545918581171], [1.428057285280316, 43.58522728648545], [1.428124154242668, 43.585109194780344], [1.4281560054754319, 43.585035992824345], [1.4280740490870338, 43.584897598286666], [1.427725548171823, 43.58443547601481], [1.4236744811462123, 43.579513436097955], [1.4236226996099062, 43.57938156081844], [1.4235299398794012, 43.57935865028259], [1.4234956672078893, 43.57928526206207], [1.4235321750536303, 43.57923683328711], [1.4236150627646236, 43.579215040338376], [1.4236819317269758, 43.57891515446265], [1.424359189518374, 43.571127434919646], [1.4243748357379773, 43.57103709662788], [1.424318211324175, 43.57099127555619], [1.4243040552207245, 43.570921240097015], [1.424354719169916, 43.5708547436637], [1.424407059499779, 43.57083257818593], [1.4244262447452452, 43.57076552295906], [1.424412833699871, 43.57037585758513], [1.4244100397320845, 43.5702350416087], [1.424342053182618, 43.570218277801985], [1.4242422154003878, 43.57013520382647], [1.4242220988323264, 43.57004579685731], [1.4242638220846018, 43.56995937012045], [1.4243310635759918, 43.56991038255193], [1.424339818008389, 43.56986698291899], [1.4243470823246334, 43.56982358328604], [1.424419352958039, 43.56931526741345], [1.4243532290537633, 43.56927317163214], [1.42429883981419, 43.56918134322423], [1.4242980947561137, 43.56913924744291], [1.4243211053098763, 43.569079629189986]]
    },
    "id": "medic+vehicle-0-1430999136295"
  }, {
    "type": "Feature",
    "properties": {
      "taskLocations": ["Rangueil", "rvpa-0"],
      "eta": "2015-05-07T11:55:14.775Z",
      "etaShort": "11:55:14",
      "taskStatus": "toPickup",
      "targetId": "rvpa-0",
      "type": "targetLocation",
      "timeRemaining": "4:43",
      "taskTitle": "Proceed to rendezvous point",
      "resourceType": "medic vehicle"
    },
    "geometry": {"type": "Point", "coordinates": [1.424318, 43.569079]},
    "id": "medic+vehicle-0-1430999136295"
  }]
};
