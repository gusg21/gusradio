CREATE TABLE IF NOT EXISTS songs (name, filepath, artist);
DELETE FROM songs;
INSERT INTO songs (name, filepath, artist) values("Test song!", "example.mp3", "Me");
INSERT INTO songs (name, filepath, artist) values("Test song 2!", "other.mp3", "You");