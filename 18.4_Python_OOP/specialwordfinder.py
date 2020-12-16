from wordfinder import WordFinder

class SpecialWordFinder(WordFinder):
    def __init__(self, file_path):
        file = open(file_path, "r")
        self.all_words = []

        for line in file:
            if line.strip() == "" or line.strip()[0] == "#":
                continue
            else:
                self.all_words.append(line.strip())

        file.close()
        print(f"{len(self.all_words)} words read")

    def random(self):
        return super().random()