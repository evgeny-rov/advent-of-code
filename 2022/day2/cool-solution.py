# found on reddit

points =   [[3, 4, 8],
            [1, 5, 9],
            [2, 6, 7]]

moves = {
    'A' : 0,
    'B' : 1,
    'C' : 2,

    'X' : 0,
    'Y' : 1,
    'Z' : 2
}

file = open('Day2\Day2Input.txt')

total = 0
for line in file:
    total += points[moves[line[0]]][moves[line[2]]]
print(total)