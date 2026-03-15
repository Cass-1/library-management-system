# Notes

## Infisical Wrapper

I think that this doesn't need to be tested. I spent a lot of time working to mock the infisical client and the infisical getSecret() function but I was unable to figure it out. I think that the whole point of having an InfisicalWrapper class is that it allows me to easily unit test other classes as it is easy to mock the getSecrets() method. Thus trying to mock the infisicalSDK module itself undermines one of the main  points of having an InfisicalWrapper class to begin with. Also, the infisical wrapper class is so straightforward it doesn't really need to be unit tested.
