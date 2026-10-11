# WG-EASY Dashboard
This widget displays a list of all wg-easy clients and their respective status.

<img width="320" height="320" alt="image" src="https://github.com/user-attachments/assets/87a538f5-8deb-4f8a-bb7f-0b34cc94fe0e" />


### How the widget works?
Wireguard is a stateless protocol and we can only evaluate connections by checking the time of the recent handshake.
The implementation determines the connection status by checking the following:
 - Handshake made within the last 15 minutes, the connection is considered active 🟢
 - Handshake longer than 15 minutes ago, the connection is considered inactive 🟢
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
 - WG-EASY_URL - The URL to your wg-easy web page 
 - WG-EASY_KEY - The base64 encoding of username:password

###### Terminal command to generate key with your current username and password:
``` 
echo "username:password" | base64
```
