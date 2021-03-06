---
title: Connect to HubRise
position: 2
layout: documentation
meta:
  title: Connecting the PixelPoint Windows API with HubRise
  description: Informs users how to connect the PixelPoint Windows API created by Slowey Systems to HubRise. Once this connection is actived, your PAR PixelPoint EPOS solution will pull information from HubRise. It shows also how to read logs.
---

## Setup

The setup process for connecting PixelPoint Windows API to HubRise is typically performed by Slowey Systems, and is completely transparent to the user.

The steps required are the following:

[comment]: # 'It was LivePepper in the demo, but we asked John to change it'

- Create a `C:\HubRise` folder at the root level of the store server.
- Copy all the relevant files needed for the connection inside this folder, including a configuration file called `HubRise.ini`.
- Remove any token that might be present in the configuration file.
- Run the `HubRise.exe` program. This will populate the token in the configuration file and create the store in the Slowey database. Then, it will connect the server with HubRise and start fetching orders.

### Sample Configuration File

The following code shows a sample configuration file. The parameters are grouped under different sections, with the relative name in square brackets. A complete description of each section is given below.

```
[Restaurant]
ID=1234

[Sales Type]
Delivery=1005
Collection=1006
Take Away=1002

[Payment]
DeliveryChargeNum=2482
OpenProduct=2152
ServiceCharge=2152
MethodNum=1008
RequestType=10

[Settings]
Token=
Manual Accept=true
Refresh Interval=20
Clear Hours=3
QA=0
Temp=c:\temp
Ftp=ftp://slowey.cloudapp.net:22
External IP=slowey.cloudapp.net
Datasource=SQLEXPRESS
DateTime Format=dd/MM
```

### Restaurant

In the section named **Restaurant**, only the `ID` parameter must be specified. This is the identification code of the restaurant in the Slowey database.

### Sales Type

This section lists all the sales types offered by the store. The actual names and values of the parameters may vary and are specified in the PAR PixelPoint EPOS. Typical values for sales types are in the `1000`-`1010` range.

To retrieve these values, follow these steps.

- Open the PixelPoint back office program, `Systemset.exe`.
- Open the **Administrator** menu.
- Select **Sales Type Setup**.
- Copy each value in the configuration file.

[comment]: # 'Get screenshots from John'

### Payment

The Payment section lists all the parameters for the payments configuration. Their values must match those in the POS.

To retrieve the value for `MethodNum`, follow these steps.

- Open the PixelPoint back office program, `Systemset.exe`.
- Open the **Administrator** menu.
- Select **Payment Method Setup**.
- Copy the value in the configuration file.

[comment]: # 'Get screenshots from John'

### Settings

The following table describes the parameters present in the settings section.

| <div style="width:12rem">Parameter Name</div> | Description                                                                                                                                                                                                                                                                                            |
| :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Token`                                       | The unique API token assigned to the store by HubRise. It is auto populated when the store server establishes its first connection with the Slowey server.                                                                                                                                             |
| `Manual Accept`                               | This parameter has two possible values. When it is set to false, any incoming order is automatically accepted by the POS. When it is set to true, each order has to be manually accepted by the store manager. In this case, a separate application must be used to review and accept incoming orders. |
| `Clear Hours`                                 | [To be completed]                                                                                                                                                                                                                                                                                      |
| `QA`                                          | [To be completed]                                                                                                                                                                                                                                                                                      |
| `Refresh Interval`                            | The number of seconds PixelPoint Windows API must wait before checking again for new orders on HubRise.                                                                                                                                                                                                |
| `Temp`                                        | The local folder where JSON requests coming from HubRise are saved and converted to XML.                                                                                                                                                                                                               |
| `Ftp`                                         | The FTP address of the Slowey server.                                                                                                                                                                                                                                                                  |
| `External IP`                                 | The IP address of the Slowey server.                                                                                                                                                                                                                                                                   |
| `Datasource`                                  | [To be completed]                                                                                                                                                                                                                                                                                      |
| `DateTime Format`                             | [To be completed]                                                                                                                                                                                                                                                                                      |

[comment]: # 'Ask John on Clear Hours, QA & Datasource. Why is DateTime empty too?'
