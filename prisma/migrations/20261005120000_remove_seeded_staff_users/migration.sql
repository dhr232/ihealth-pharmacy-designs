-- Sign-in is now an emailed code for info@ihealthpharmacy.ca only (no passwords, no other staff).
-- Remove the two old seeded accounts. Their Session and TwoFactorToken rows cascade; a linked
-- Pharmacist profile keeps existing with its userId set to NULL.
DELETE FROM "User"
WHERE "email" IN ('admin@ihealthpharmacy.ca', 'pharmacist@ihealthpharmacy.ca');
