<h1 align="center">
    A Fake Store
</h1>

<p>
    <b>
    Using a real credit card is strongly discouraged. Please use one of these test cards when submitting the payment forms: <a href="https://help.usaepay.info/developer/reference/testcards" target="_blank">Test Cards</a>
    </b>
</p>

## Getting Started

#### Requirements

<ul>
    <li>direnv</li>
    <li>nvm</li>
</ul>

<p>
    You will need to create <b>.envrc</b> by copying & renaming <b>.envrc.example</b>. Then, fill in the missing values in <b>.envrc</b>.
</p>

```
$ cp .envrc.example .envrc
```

<p>
    You will need <b>direnv</b> to use .envrc. You can find the documentation here: <a href="https://direnv.net" target="_blank">https://direnv.net</a>
</p>
<br />

#### Client

<p>
    To run the front end, change directory into client and run it normally.
</p>

```
    cd client && yarn start
```

<br />

#### Server

<p>
    To run the backend end, you can just npm run nodemon.
</p>

```
    yarn dev
```
