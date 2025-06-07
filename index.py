import random

def get_emoji_feedback(diff):
    if diff == 0:
        return "🎉 Perfect!"
    elif diff <= 3:
        return "🔥 You're on fire!"
    elif diff <= 7:
        return "😊 Getting warmer!"
    elif diff <= 15:
        return "😐 Getting colder..."
    else:
        return "❄️ Ice cold!"

def set_difficulty():
    print("\nChoose difficulty:")
    print("1. Easy (1-50, 10 attempts)")
    print("2. Medium (1-100, 7 attempts)")
    print("3. Hard (1-200, 5 attempts)")
    
    while True:
        choice = input("Enter 1, 2, or 3: ")
        if choice == '1':
            return 1, 50, 10
        elif choice == '2':
            return 1, 100, 7
        elif choice == '3':
            return 1, 200, 5
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

def number_guessing_game():
    import tkinter as tk
    root = tk.Tk()
    root.title("Secure Password Generator")
    min_val, max_val, max_attempts = set_difficulty()
    secret = random.randint(min_val, max_val)
    attempts = 0
    history = []

    print(f"\nGuess the number between {min_val} and {max_val}. You have {max_attempts} attempts.\n")

    while attempts < max_attempts:
        try:
            guess = int(input(f"Attempt {attempts + 1}: Enter your guess: "))
            if guess < min_val or guess > max_val:
                print(f"🚫 Please guess a number between {min_val} and {max_val}.\n")
                continue
        except ValueError:
            print("🚫 Please enter a valid number.\n")
            continue

        attempts += 1
        diff = abs(secret - guess)
        feedback = get_emoji_feedback(diff)
        history.append((guess, feedback))
        
        print(f"Feedback: {feedback}")

        if diff == 0:
            print("\n🎉 Congratulations! You guessed the number in {} attempts!".format(attempts))
            break
        elif attempts == max_attempts:
            print(f"\n❌ Game Over! The correct number was {secret}.")
            break

    print("\n🧾 Guess History:")
    for i, (g, f) in enumerate(history, 1):
        print(f"{i}. Guess: {g} — {f}")

if __name__ == "__main__":
    number_guessing_game()
