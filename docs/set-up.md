## Potential Set-Up Errors

### While Running 'react-native run-android'

| **Error Message** | **Resolution** |
| --- | --- |
| Could not install the app on the device, read the error above for details. | exec `chmod 755 android/gradlew` |
| SDK location not found. | exec `echo "sdk.dir = /Users/$(whoami)/Library/Android/sdk" > android/local.properties` or location of your sdk file (i.e. `echo "sdk.dir = C\:\\Android\\sdk" > android/local.properties`) | 

