ALTER TABLE activation_token
    add column created_at timestamp with time zone;
ALTER TABLE recovery_token
    add column created_at timestamp with time zone;
ALTER TABLE users
    add column activated_at timestamp with time zone;
ALTER TABLE users
    add column registered_at timestamp with time zone;
