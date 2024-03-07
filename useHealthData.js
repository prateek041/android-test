import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';

const useHealthData = () => {
  const [androidPermission, setAndroidPermission] = useState();
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const init = async () => {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.log('Failed to initialize Health Connect');
        return;
      }

      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'Distance' },
        { accessType: 'read', recordType: 'FloorsClimbed' },
      ]);

      setAndroidPermission(grantedPermissions);
    };

    init();
  }, []);
};
