# TC3005B.501-Frontend

Web Application of the travel management system portal developed during course TC3005B by group 501.

## Getting Started

In order to run this Frontend, the following steps are required:

### Installing

The only option currently is to clone the repository locally from GitHub.

#### Using `git`

```sh
git clone https://github.com/101-Coconsulting/TC3005B.501-Frontend
```

#### Using `gh` (GitHub CLI)

```sh
gh repo clone 101-Coconsulting/TC3005B.501-Frontend
```

### Dependencies

The dependencies for this project are managed using [the pnpm package manager](https://pnpm.io/), so it is recommended to use this. However, [npm](https://www.npmjs.com/) can also be used. The dependencies are automatically managed by `pnpm` in the `package.json` file, so they are installed automatically when issuing the install command.

#### Using `pnpm`

```sh
pnpm install
```

#### Using `npm`

```sh
npm install
```

### Running

To run the Frontend, utilize whichever package manager you used for dependencies to run the project.

#### Using `pnpm`

```sh
pnpm run dev
```

#### Using `npm`

```sh
npm run dev
```

And you're good to go! A new browser window should open and you should be able to see the Authorizer's dashboard.

### Configuring

The current version lacks any sort of connection to any sort of backend, as well as any sort of login interface. Therefore, the way to access different dashboards for different roles, is to manually edit the [/src/data/cookies.ts](/src/data/cookies.ts) file to choose the role whose dashboard you want to visualize.

Filename: /src/data/cookies.ts
```typescript
import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    // CHANGE THIS
    role: "Authorizer" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};
```
