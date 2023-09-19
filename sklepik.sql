-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Wrz 19, 2023 at 08:44 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sklepik`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `description`) VALUES
(1, 'Inne'),
(2, 'Bułki'),
(3, 'Kasa'),
(4, 'HotDogi'),
(5, 'Sprzątanie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `code` text DEFAULT NULL,
  `type` enum('article','product','discount','promotion') DEFAULT NULL,
  `short_name` text DEFAULT NULL,
  `full_name` text DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `price`, `code`, `type`, `short_name`, `full_name`, `company_id`) VALUES
(1, 0.50, '11', 'article', 'Papier jadalny', 'Papier Jadalny', NULL),
(2, 2.00, '41', 'product', 'Bułka z masłem', 'Bułka z masłem', NULL),
(3, 3.00, '42', 'product', 'Bułka z szynką', 'Bułka z szynką', NULL),
(4, 3.00, '43', 'product', 'Bułka z serem', 'Bułka z serem', NULL),
(5, 4.00, '44', 'product', 'Bułka z serem i szynką', 'Bułka z serem i szynką', NULL),
(6, 6.00, '45', 'product', 'Bułka Gołosza', 'Bułka Gołosza', NULL),
(7, 1.00, '48', 'product', 'Bułka HotDog', 'Bułka HotDog', NULL),
(8, 1.00, '49', 'product', 'Bułka', 'Bułka', NULL),
(9, 2.00, '21', 'product', 'Tost z masłem', 'Tost z masłem', NULL),
(10, 3.00, '22', 'product', 'Tost z szynką', 'Tost z szynką', NULL),
(11, 3.00, '23', 'product', 'Tost z serem', 'Tost z serem', NULL),
(12, 4.00, '24', 'product', 'Tost z serem i szynką', 'Tost z serem i szynką', NULL),
(13, 3.00, '51', 'product', 'Kawa Kubek', 'Kawa Kubek', NULL),
(14, 2.00, '52', 'product', 'Kawa Kubek Własny', 'Kawa w kubku klienta', NULL),
(15, 5.00, '30', 'product', 'HotDog', 'HotDog', NULL),
(16, 0.00, '61', 'product', 'Ciemna wersja', 'Ciemna wersja bułki', NULL),
(17, 0.50, '62', 'product', 'Podgrzanie bułki', 'Podgrzanie bułki', NULL),
(18, 4.00, '81', 'product', 'Płatki', 'Płatki', NULL),
(19, 1.00, '71', 'article', 'Długopis niebieski', 'Długopis niebieski', NULL),
(20, 1.00, '72', 'article', 'Długopis czarny', 'Długopis czarny', NULL),
(21, 4.00, '4025500253905', 'article', 'MM Ciasteczkowy', 'MullerMilch Ciasteczkowy', NULL),
(22, 4.00, '4025500132477', 'article', 'MM Czekoladowy', 'MullerMilch Czekoladowy', NULL),
(23, 4.00, '4025500135645', 'article', 'MM Truskawkowy', 'MullerMilch Truskowkowy', NULL),
(24, 4.00, '4025500132446', 'article', 'MM Pistacjowy', 'MullerMilch Pistacjowy', NULL),
(25, 4.00, '4025500260132', 'article', 'MMS Truskawkowy', 'MullerMilch Truskawkowy', NULL),
(26, 5.00, '4025500269166', 'article', 'MMS Bananowy', 'MullerMilch Shake Bananowy', NULL),
(27, 5.00, '4025500269180', 'article', 'MMS Waniliowy', 'MullerMilch Shake Waniliowy', NULL),
(28, 5.00, '4025500260187', 'article', 'MMS Czekoladowy', 'MullerMilch Shake Czekoladowy', NULL),
(29, 5.00, '5901939103099', 'article', 'Skyr Jagodowy', 'Skyr Jagodowy', NULL),
(30, 5.00, '5901939103075', 'article', 'Skyr Waniliowy', 'Skyr Waniliowy', NULL),
(31, 5.00, '5901939103235', 'article', 'Skyr Tru-Kiwi', 'Skyr Truskawka-Kiwi', NULL),
(32, 2.50, '4014500021560', 'article', 'Jogurt Truskawkowy', 'Jogurt Truskawkowy', NULL),
(33, 2.50, '4014500021560', 'article', 'Jogurt Jabłkowy', 'Jogurt Jabłkowy', NULL),
(34, 2.50, '4014500021560', 'article', 'Jogurt Jagodowy', 'Jogurt Jagodowy', NULL),
(35, 2.50, '4014500006093', 'article', 'Jogurt Brzoskwiniowy', 'Jogurt Brzoskiwniowy', NULL),
(36, 2.50, '5900334010544', 'article', 'Tym 0,25l Jab-Kiwi', 'Tymbark Sok 0,25l Jabłko-Kiwi', NULL),
(37, 2.50, '5900334000859', 'article', 'Tym 0,25l Jab-Mie', 'Tymbark Sok 0,25l Jabłko-Mięta', NULL),
(38, 2.50, '5900334015747', 'article', 'Tym 0,25l Man-Mie', 'Tymbark Sok 0,25l Mango-Mięta', NULL),
(39, 2.50, '5900334000767', 'article', 'Tym 0,25l Mal-Mie', 'Tymbark Sok 0,25l Malina-Mięta', NULL),
(40, 2.50, '5900334000880', 'article', 'Tym 0,25l Jab-Wis', 'Tymbark Sok 0,25l Jabłko-Wiśnia', NULL),
(41, 2.50, '5900334005625', 'article', 'Tym 0,25l Jab-Arb', 'Tymbark Sok 0,25l Jabłko-Arbuz', NULL),
(42, 3.50, '5900334000279', 'article', 'Tym 0,5l Jab-Brz', 'Tymbark Sok 0,5l Jabłko-Brzoskwinia', NULL),
(43, 3.50, '5900334000255', 'article', 'Tym 0,5l Jab-Mie', 'Tymbark Sok 0,5l Jabłko-Mięta', NULL),
(44, 3.50, '5900334000286', 'article', 'Tym 0,5l Jab-Wis', 'Tymbark Sok 0,5l Jabłko-Wiśnia', NULL),
(45, 5.50, '5900334012753', 'article', 'Tym 1l Jab Karton', 'Tymbark Sok 1l Jabłko Karton', NULL),
(46, 5.50, '5900334005939', 'article', 'Tym 1l Jab Butelka', 'Tymbark Sok 1l Jabłko Butelka', NULL),
(47, 5.50, '5900334013378', 'article', 'Tym 1l Multi', 'Tymbark Sok 1l Multiwitamina', NULL),
(48, 4.50, '5900334001047', 'article', 'Tym 1l Kaktus', 'Tymbark Sok 1l Kaktus', NULL),
(49, 2.00, '20820701', 'article', 'Pałeczki kukurydziane', 'Pałeczki kukurydziane', NULL),
(50, 2.00, '20981136', 'article', 'Chrupki kukurydziane', 'Chrupki kukurydziane', NULL),
(51, 5.00, '5900334006233', 'article', 'Tym 2L Jab-Wis', 'Tymbark Sok 2l Jabłko-Wiśnia', NULL),
(52, 5.00, '5900334000910', 'article', 'Tym 2L Jab-Brz', 'Tymbark Sok 2l Jabłko-Brzoskwinia', NULL),
(53, 6.00, '5900334017734', 'article', 'Nest 1,5L Lem', 'Nestea 1,5l Lemon', NULL),
(54, 6.00, '5900334017741', 'article', 'Nest 1,5L Peach', 'Nestea 1,5l Peach', NULL),
(55, 6.00, '5900334017758', 'article', 'Nest GT Citrus', 'Nestea 1,5l Green Tea Citrus', NULL),
(56, 2.00, '5904017396079', 'article', 'Zeszyt', 'Zeszyt', NULL),
(57, 1.50, '5904215157847', 'article', 'Chusteczki', 'Chusteczki', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles_sellment`
--

CREATE TABLE `articles_sellment` (
  `id` int(11) NOT NULL,
  `article_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles_sellment`
--

INSERT INTO `articles_sellment` (`id`, `article_id`, `order_id`, `price`, `amount`) VALUES
(1, 13, 1, 3.00, 1),
(2, 44, 2, 3.50, 1),
(3, 48, 2, 4.50, 1),
(4, 47, 2, 5.50, 1),
(5, 56, 3, 2.00, 2),
(6, 5, 4, 4.00, 1),
(7, 39, 5, 2.50, 1),
(8, 6, 6, 6.00, 1),
(9, 6, 7, 6.00, 1),
(10, 15, 8, 5.00, 1),
(11, 51, 9, 5.00, 1),
(12, 15, 10, 5.00, 1),
(13, 15, 11, 5.00, 2),
(14, 6, 12, 6.00, 1),
(15, 15, 13, 5.00, 1),
(16, 5, 14, 4.00, 1),
(17, 5, 15, 4.00, 1),
(18, 46, 16, 5.50, 1),
(19, 12, 17, 4.00, 2),
(20, 6, 17, 6.00, 1),
(21, 37, 18, 2.50, 1),
(22, 6, 19, 6.00, 1),
(23, 52, 20, 5.00, 1),
(24, 15, 21, 5.00, 1),
(25, 15, 22, 5.00, 1),
(26, 5, 23, 4.00, 1),
(27, 15, 24, 5.00, 1),
(28, 12, 25, 4.00, 1),
(29, 48, 26, 4.50, 1),
(30, 15, 27, 5.00, 1),
(31, 15, 28, 5.00, 2),
(32, 15, 29, 5.00, 1),
(33, 15, 30, 5.00, 1),
(34, 15, 31, 5.00, 2),
(35, 6, 32, 6.00, 1),
(36, 43, 33, 3.50, 1),
(37, 5, 34, 4.00, 1),
(38, 29, 35, 5.00, 1),
(39, 48, 36, 4.50, 1),
(40, 6, 37, 6.00, 1),
(41, 16, 37, 0.00, 1),
(42, 44, 38, 3.50, 1),
(43, 43, 39, 3.50, 1),
(44, 15, 40, 5.00, 1),
(45, 21, 40, 4.00, 1),
(46, 15, 41, 5.00, 1),
(47, 15, 42, 5.00, 1),
(48, 6, 43, 6.00, 1),
(49, 16, 43, 0.00, 1),
(50, 6, 44, 6.00, 1),
(51, 16, 44, 0.00, 1),
(52, 6, 45, 6.00, 1),
(53, 16, 45, 0.00, 1),
(54, 52, 46, 5.00, 1),
(55, 17, 47, 0.50, 1),
(56, 52, 48, 5.00, 1),
(57, 15, 49, 5.00, 1),
(58, 15, 50, 5.00, 1),
(59, 51, 51, 5.00, 1),
(60, 6, 52, 6.00, 1),
(61, 36, 53, 2.50, 1),
(62, 5, 54, 4.00, 1),
(63, 44, 55, 3.50, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `surname` text DEFAULT NULL,
  `mail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `coffee_subscription`
--

CREATE TABLE `coffee_subscription` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `coffees_left` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `type` text DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `worker_id`, `client_id`, `payment_method_id`, `created`) VALUES
(1, 1, NULL, 2, '2023-09-05 20:51:04'),
(2, 1, NULL, 2, '2023-09-05 20:47:44'),
(3, 1, NULL, 2, '2023-09-05 20:47:46'),
(4, 1, NULL, 2, '2023-09-05 20:47:49'),
(5, 1, NULL, 2, '2023-09-05 20:47:52'),
(6, 1, NULL, 2, '2023-09-05 20:47:55'),
(7, 1, NULL, 2, '2023-09-05 20:47:57'),
(8, 1, NULL, 2, '2023-09-05 20:48:00'),
(9, 1, NULL, 2, '2023-09-05 20:48:02'),
(10, 1, NULL, 2, '2023-09-05 20:48:05'),
(11, 1, NULL, 2, '2023-09-05 20:48:09'),
(12, 1, NULL, 2, '2023-09-05 20:48:12'),
(13, 1, NULL, 2, '2023-09-05 20:48:14'),
(14, 1, NULL, 2, '2023-09-05 20:48:18'),
(15, 1, NULL, 2, '2023-09-05 20:48:21'),
(16, 1, NULL, 2, '2023-09-05 20:48:23'),
(17, 1, NULL, 2, '2023-09-05 20:48:25'),
(18, 1, NULL, 2, '2023-09-05 20:48:27'),
(19, 1, NULL, 2, '2023-09-05 20:48:29'),
(20, 1, NULL, 2, '2023-09-05 20:48:33'),
(21, 1, NULL, 2, '2023-09-05 20:48:52'),
(22, 1, NULL, 2, '2023-09-05 20:48:55'),
(23, 1, NULL, 2, '2023-09-05 20:48:57'),
(24, 1, NULL, 2, '2023-09-05 20:48:59'),
(25, 1, NULL, 2, '2023-09-05 20:49:01'),
(26, 1, NULL, 2, '2023-09-05 20:49:06'),
(27, 1, NULL, 2, '2023-09-05 20:49:08'),
(28, 1, NULL, 2, '2023-09-05 20:49:10'),
(29, 1, NULL, 2, '2023-09-05 20:49:12'),
(30, 1, NULL, 2, '2023-09-05 20:49:14'),
(31, 1, NULL, 2, '2023-09-05 20:49:17'),
(32, 1, NULL, 1, '2023-09-05 20:53:44'),
(33, 1, NULL, 2, '2023-09-05 20:49:21'),
(34, 1, NULL, 2, '2023-09-05 20:49:23'),
(35, 1, NULL, 2, '2023-09-05 20:49:26'),
(36, 1, NULL, 2, '2023-09-05 20:49:28'),
(37, 1, NULL, 2, '2023-09-05 20:49:30'),
(38, 1, NULL, 1, '2023-09-05 20:50:09'),
(39, 1, NULL, 1, '2023-09-05 20:50:07'),
(40, 1, NULL, 1, '2023-09-05 20:50:04'),
(41, 1, NULL, 1, '2023-09-05 20:50:02'),
(42, 1, NULL, 1, '2023-09-05 20:36:55'),
(43, 1, NULL, 1, '2023-09-05 20:36:55'),
(44, 1, NULL, 1, '2023-09-05 20:36:55'),
(45, 1, NULL, 1, '2023-09-05 20:36:55'),
(46, 1, NULL, 1, '2023-09-05 20:36:55'),
(47, 1, NULL, 1, '2023-09-05 20:36:55'),
(48, 1, NULL, 1, '2023-09-05 20:36:55'),
(49, 1, NULL, 1, '2023-09-05 20:36:55'),
(50, 1, NULL, 1, '2023-09-05 20:36:55'),
(51, 1, NULL, 1, '2023-09-05 20:36:55'),
(52, 1, NULL, 1, '2023-09-05 20:36:55'),
(53, 1, NULL, 1, '2023-09-05 20:36:55'),
(54, 1, NULL, 1, '2023-09-05 20:36:55'),
(55, 1, NULL, 1, '2023-09-05 20:36:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'CASH'),
(2, 'BLIK');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `worker_id`, `role_id`) VALUES
(1, 1, 2),
(3, 1, 1),
(4, 2, 1),
(5, 3, 2),
(6, 4, 2),
(9, 5, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'worker');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sellment_close`
--

CREATE TABLE `sellment_close` (
  `id` int(11) NOT NULL,
  `number` text DEFAULT NULL,
  `year_number` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `issuer_worker_id` int(11) DEFAULT NULL,
  `starting_order_id` int(11) DEFAULT NULL,
  `ending_order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellment_close`
--

INSERT INTO `sellment_close` (`id`, `number`, `year_number`, `date`, `issuer_worker_id`, `starting_order_id`, `ending_order_id`) VALUES
(21, '1', '23/24', '2023-09-11 20:10:30', 2, 1, 55);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `worked_hours`
--

CREATE TABLE `worked_hours` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `work_date` date DEFAULT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worked_hours`
--

INSERT INTO `worked_hours` (`id`, `activity_id`, `admin_id`, `worker_id`, `amount`, `work_date`, `modified`) VALUES
(0, 5, 2, 3, 2, '2023-09-05', '2023-09-05 21:05:19'),
(1, 5, 2, 3, 2, '2023-09-05', '2023-09-05 21:04:37'),
(2, 4, 2, 4, 2, '2023-09-05', '2023-09-05 21:03:29'),
(3, 3, 2, 2, 2, '2023-09-05', '2023-09-05 21:02:42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `surname` text DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `name`, `surname`, `password`) VALUES
(1, 'igor', 'manoryk', NULL),
(2, 'Grzgorz', 'Studniarz', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
(3, 'Mateusz', 'Bieniek', 'ee2e61021147fd7f5076904e02837be535c52e94eb79a75c01b82a04a692f628'),
(4, 'Anna', 'Poloczek', NULL),
(5, 'Sebastian', 'Czop', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_company_id` (`company_id`);

--
-- Indeksy dla tabeli `articles_sellment`
--
ALTER TABLE `articles_sellment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indeksy dla tabeli `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `coffee_subscription`
--
ALTER TABLE `coffee_subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_client_id` (`client_id`);

--
-- Indeksy dla tabeli `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_worker_id` (`worker_id`),
  ADD KEY `FK_role_id` (`role_id`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `sellment_close`
--
ALTER TABLE `sellment_close`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issuer_worker_id` (`issuer_worker_id`),
  ADD KEY `ending_order_id` (`ending_order_id`);

--
-- Indeksy dla tabeli `worked_hours`
--
ALTER TABLE `worked_hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `worker_id` (`worker_id`);

--
-- Indeksy dla tabeli `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `articles_sellment`
--
ALTER TABLE `articles_sellment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coffee_subscription`
--
ALTER TABLE `coffee_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sellment_close`
--
ALTER TABLE `sellment_close`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `FK_company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `articles_sellment`
--
ALTER TABLE `articles_sellment`
  ADD CONSTRAINT `articles_sellment_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `articles_sellment_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `coffee_subscription`
--
ALTER TABLE `coffee_subscription`
  ADD CONSTRAINT `FK_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `logs_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `FK_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK_worker_id` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`);

--
-- Constraints for table `sellment_close`
--
ALTER TABLE `sellment_close`
  ADD CONSTRAINT `sellment_close_ibfk_1` FOREIGN KEY (`issuer_worker_id`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `sellment_close_ibfk_2` FOREIGN KEY (`ending_order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `worked_hours`
--
ALTER TABLE `worked_hours`
  ADD CONSTRAINT `worked_hours_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`),
  ADD CONSTRAINT `worked_hours_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `worked_hours_ibfk_3` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
