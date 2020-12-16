"""Word Finder: finds random words from a dictionary."""

from random import randint

class WordFinder:
    def __init__(self, file_path):
        file = open(file_path, "r")
        self.all_words = []

        for line in file:
            self.all_words.append(line.strip())

        file.close()
        print(f"{len(self.all_words)} words read")

    def random(self):
        random_index = randint(0,(len(self.all_words)-1))
        return self.all_words[random_index]