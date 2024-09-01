Rozbuduj aplikacjię z poprzedniego zadania (RickAndMortyAPI), która korzysta z JSON Server jako lokalnej bazy danych. Twoim celem jest zintegrowanie aplikacji z JSON Server w taki sposób, aby:

Pobrać dane o 20 postaciach z zewnętrznego API. Każdy obiekt postaci powinien zawierać kluczowe informacje: “id”, “name”, “status”, “species” oraz “image”. Te dane należy następnie zapisać do lokalnego serwera JSON Server (Możesz dane uzupełnić ręcznie)

Zapewnić, że wszystkie istniejące funkcjonalności aplikacji, takie jak paginacja (wyświetl 5 elementów na stronę), wyszukiwanie postaci po nazwie oraz filtrowanie postaci na podstawie ich statusu, są obsługiwane przez dane znajdujące się na Twoim JSON Server.

Dodać do każdej karty postaci przycisk umożliwiający usunięcie postaci z lokalnej bazy danych

Stwórz formularz, który pozwoli użytkownikom na dodawanie nowych postaci do lokalnej bazy danych za pomocą JSON Server. Formularz powinien składać się z pól do wprowadzenia danych takich jak: „name” (nazwa), „status” (status) oraz „species” (gatunek). Dodatkowo, obiekt reprezentujący nową postać zostanie automatycznie uzupełniony o klucz „image” zawierający link do domyślnego obrazka postaci, którym jest https://rickandmortyapi.com/api/character/avatar/3.jpeg. Dane z formularza wraz z dołączonym linkiem obrazka powinny być wysłane do serwera JSON Server po kliknięciu przycisku dodania nowej postaci.

Ważne uwagi:

Jeżeli napotkasz trudności z wyszukiwaniem po fragmencie tekstu, może to być spowodowane przez wersję biblioteki JSON Server. Poszukaj informacji, jak można to naprawić

Podczas korzystania z Live Server, dodawanie oraz usuwanie elementów może powodować przeładowanie strony. Problem ten nie występuje, gdy aplikacja jest uruchamiana bezpośrednio w przeglądarce.
