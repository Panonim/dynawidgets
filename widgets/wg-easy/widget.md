# WG-EASY Dashboard
This widget displays a list of all wg-easy clients and their respective status.

<img width="314" height="313" alt="image" src="https://github.com/user-attachments/assets/dc21ddb0-2f03-49e1-9f1f-64c4f3232ca9" />

### How the widget works?
Wireguard is a stateless protocol and we can only evaluate connections by checking the time of the recent handshake.
The implementation determines the connection status by checking the following:
 - Handshake made within the last 15 minutes, the connection is considered active 🟢
 - Handshake longer than 15 minutes ago, the connection is considered inactive 🔴
 - Handshake never made, i.e, handshake=null, we consider it inactive 🔴

### Configuration
Hardcoded value for data-collapse, which is currently 6, i.e, when the list of clients gets longer than six rows, the list will collapse and you will able to expand.

#### Enable Widget

```yaml
- type: dynawidgets
  widget: wg-easy
  title: wg-easy clients
```
## Environment Variables
 - WG_EASY_URL - The URL to your wg-easy web page 
 - WG_EASY_KEY - The base64 encoding of username:password

###### Terminal command to generate key with your current username and password:
``` 
echo "username:password" | base64
```
