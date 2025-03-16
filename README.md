# SIAP

## Setup instructions

No need to .env file, run:

```bash
npm install && npm run dev
```

## Notes

- In the 'home_insurance_application', there's a backend issue where the 'state'
  field depends on the 'country' field. However, the backend response doesn't
  include the 'country' field. Since 'state' requires a 'country' to proceed
  with the server fetch, the form is currently non-functional.
- Transformer for some dynamic fields
- Draft form
- Dark theme
- Lazy loading
- Column selector
- React query
- Ant
- Axios
