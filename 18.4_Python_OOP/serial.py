"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self,start):
        self.start = start
        self.current_num = None

    def generate(self):
        if self.current_num == None:
            self.current_num = self.start
        else:
            self.current_num += 1
        return self.current_num
    
    def reset(self):
        self.current_num = None