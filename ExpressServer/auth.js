const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const users = [{ id: 1, username: 'test', password: '$2a$10$somethinghashedhere' }]; // Example user

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(user => user.username === username);
    if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

module.exports = passport;
