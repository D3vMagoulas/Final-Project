INSERT INTO news (title, content, image_url, published_at)
SELECT 'Welcome to the season', 'First practice this week!', NULL, NOW()
WHERE NOT EXISTS (SELECT 1 FROM news WHERE title = 'Welcome to the season');

INSERT INTO news (title, content, image_url, published_at)
SELECT 'Big signing', 'We signed a new point guard.', NULL, NOW()
WHERE NOT EXISTS (SELECT 1 FROM news WHERE title = 'Big signing');


INSERT INTO game (opponent, home, venue, tipoff, competition, tickets_available, ticket_price)
SELECT 'City Hawks', TRUE, 'Main Arena', DATE_ADD(UTC_TIMESTAMP(), INTERVAL 7 DAY), 'League', 500, 20.00
WHERE NOT EXISTS (SELECT 1 FROM game WHERE opponent = 'City Hawks');

INSERT INTO game (opponent, home, venue, tipoff, competition, tickets_available, ticket_price)
SELECT 'River Cats', FALSE, 'Riverside Dome', DATE_ADD(UTC_TIMESTAMP(), INTERVAL 14 DAY), 'League', 300, 25.00
WHERE NOT EXISTS (SELECT 1 FROM game WHERE opponent = 'River Cats');


INSERT INTO player (first_name, last_name, position, number_on_jersey, height_cm, birth_date, nationality, active)
SELECT 'Basilis','Sansonetti','SF',14,192,'2005-2-14','Greece',TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM player WHERE first_name='Basilis' AND last_name='Sansonetti' AND number_on_jersey=13);

INSERT INTO player (first_name, last_name, position, number_on_jersey, height_cm, birth_date, nationality, active)
SELECT 'Nikos','Papadopoulos','C',15,210,'1996-11-03','Greece',TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM player WHERE first_name='Nikos' AND last_name='Papadopoulos' AND number_on_jersey=15);
