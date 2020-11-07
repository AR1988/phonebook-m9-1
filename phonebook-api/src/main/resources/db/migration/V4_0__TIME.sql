ALTER TABLE activation_token
    add column created_at date;
ALTER TABLE recovery_token
    add column created_at date;
ALTER TABLE users
    add column activated_at date;
ALTER TABLE users
    add column registered_at date;
