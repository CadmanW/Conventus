- add logs 



# Security
## Protect against LFI
Here are a few ways to prevent LFI attacks:

- ID assignation – save your file paths in a secure database and give an ID for every single one, this way users only get to see their ID without viewing or altering the path
- Whitelisting  – use verified and secured whitelist files and ignore everything else
- Use databases – don’t include files on a web server that can be compromised, use a database instead
- Better server instructions – make the server send download headers automatically instead of executing files in a specified directory

## Encrypt network traffick

## Use HTTPS instead