// HijriDateConverter.js

export class HijriDateConverter {
    constructor() {
        this.iTanggalM = 0;
        this.iTanggalH = 0;
        this.iBulanM = 0;
        this.iBulanH = 0;
        this.iTahunM = 0;
        this.iTahunH = 0;
        this.iTahunJ = 0;
    }

    // Helper function to round floating point numbers
    intPart(floatNum) {
        return (floatNum < -0.0000001 ? Math.ceil(floatNum - 0.0000001) : Math.floor(floatNum + 0.0000001));
    }

    // Hijri calculation logic
    hitung_Hijriah(d, m, y) {
        const mPart = (m - 13) / 12;
        let jd = this.intPart((1461 * (y + 4800 + this.intPart(mPart))) / 4) +
            this.intPart((367 * (m - 1 - 12 * (this.intPart(mPart)))) / 12) -
            this.intPart((3 * (this.intPart((y + 4900 + this.intPart(mPart)) / 100))) / 4) + d - 32075;
        let l = jd - 1948440 + 10632;
        let n = this.intPart((l - 1) / 10631);
        l = l - 10631 * n + 354;
        let j = (this.intPart((10985 - l) / 5316)) * (this.intPart((50 * l) / 17719)) + (this.intPart(l / 5670)) * (this.intPart((43 * l) / 15238));
        l = l - (this.intPart((30 - j) / 15)) * (this.intPart((17719 * j) / 50)) - (this.intPart(j / 16)) * (this.intPart((15238 * j) / 43)) + 29;
        this.iBulanH = this.intPart((24 * l) / 709);
        this.iTanggalH = l - this.intPart((709 * this.iBulanH) / 24);

        const tambahan = 1;  // Adjustment, usually -1, 0, or +1

        this.iTanggalH = this.iTanggalH + tambahan;
        this.iBulanH -= 1;
        if (this.iTanggalH > 30) {
            this.iTanggalH = this.iTanggalH - 30;
            this.iBulanH = this.iBulanH + 1;
        }
        this.iTahunH = 30 * n + j - 30;
    }

    // Main function to calculate and return the date
    hitung_Tanggal(format) {
        const namaBulanE = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const namaBulanH = ["Muharram", "Safar", "Rabi Al-Awwal", "Rabi Al-Thani", "Jumada Al-Ula", "Jumada Al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhul Qada", "Dhul Hijja"];
        const namaBulanI = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const namaBulanHI = ["Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir", "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", "Ramadhan", "Syawal", "Dzul Qa'dah", "Dzul Hijjah"];
        const namaBulanJ = ["Suro", "Sapar", "Mulud", "Ba'da Mulud", "Jumadil Awal", "Jumadil Akhir", "Rejeb", "Ruwah", "Poso", "Syawal", "Dulkaidah", "Besar"];
        const namaHariE = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
        const namaHariH = ["Al-Hamis", "Al-Jum'a", "As-Sabt", "Al-Ahad", "Al-Itsnayna", "Ats-Tsalatsa'", "Al-Arba'a'"];
        const namaHariI = ["Kamis", "Jumat", "Sabtu", "Ahad", "Senin", "Selasa", "Rabu"];
        const namaHariJ = ["Wage", "Kliwon", "Legi", "Pahing", "Pon", "Wage", "Kliwon"];

        const now = new Date();
        this.iTanggalM = now.getDate();
        this.iBulanM = now.getMonth();
        this.iTahunM = now.getFullYear();

        this.hitung_Hijriah(this.iTanggalM, this.iBulanM, this.iTahunM);
        const hr = Date.UTC(this.iTahunM, this.iBulanM, this.iTanggalM, 0, 0, 0) / 1000 / 60 / 60 / 24;

        this.iTahunJ = this.iTahunH + 512;
        const sHariE = namaHariE[hr % 7];  // English day name
        const sHariH = "Yaum " + namaHariH[hr % 7]; // Arabic day name
        const sHariI = namaHariI[hr % 7];  // Indonesian day name
        const sHariJ = namaHariJ[hr % 5];  // Javanese day name
        const sBulanE = namaBulanE[this.iBulanM]; // English month name (Gregorian)
        const sBulanH = namaBulanH[this.iBulanH]; // Hijri month name (Arabic)
        const sBulanI = namaBulanI[this.iBulanM]; // Indonesian month name (Gregorian)
        const sBulanHI = namaBulanHI[this.iBulanH]; // Indonesian Hijri month name
        const sBulanJ = namaBulanJ[this.iBulanH]; // Javanese Hijri month name

        const zTanggalM = this.iTanggalM < 10 ? "0" + this.iTanggalM : this.iTanggalM;
        const zTanggalH = this.iTanggalH < 10 ? "0" + this.iTanggalH : this.iTanggalH;
        this.iBulanM += 1; // Month index adjustment for Gregorian
        this.iBulanH += 1; // Month index adjustment for Hijri
        const zBulanM = this.iBulanM < 10 ? "0" + this.iBulanM : this.iBulanM;
        const zBulanH = this.iBulanH < 10 ? "0" + this.iBulanH : this.iBulanH;

        let sDate = {};
        switch (format) {
            case 2:
                sDate['date']= sHariE + ", " + this.iTanggalM + " " + sBulanE + " " + this.iTahunM;
                break;
            case 3:
                sDate['date'] = sHariI + " " + sHariJ + ", " + this.iTanggalM + " " + sBulanI + " " + this.iTahunM + " / " + this.iTanggalH + " " + sBulanHI + " " + this.iTahunH + " H";
                break;
            case 4:
                sDate['date'] = sHariI + " " + sHariJ + ", " + this.iTanggalH + " " + sBulanJ + " " + this.iTahunJ;
                break;
            case 5:
                sDate['date'] = sHariH + ", " + this.iTanggalH + " " + sBulanH + " " + this.iTahunH + " H";
                break;
            case 6:
                sDate['date'] = sHariI + ", " + this.iTanggalH + " " + sBulanHI + " " + this.iTahunH + " H";
                break;
            case 7:
                sDate['date'] = sHariI + " " + sHariJ + ", " + this.iTanggalM + " " + sBulanI + " " + this.iTahunM + " / " + this.iTanggalH + " " + sBulanHI + " " + this.iTahunH + " H";
                break;
            default:
                sDate['date'] = this.iTanggalH;
                sDate['day'] = sHariI + " " + sHariJ;
                sDate['today'] = this.iTanggalH + " " + sBulanHI + " " + this.iTahunH + " H"+" ("+zTanggalM + "/" + zBulanM + "/" + this.iTahunM+")";
                break;
        }
        return sDate;
    }
}
