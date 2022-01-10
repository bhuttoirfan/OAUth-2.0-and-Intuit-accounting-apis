import { main } from "@functions/Account/create_account/handler";

test("create account",async () => {
    const body = {
        "Name": "Hellback",
        "AccountType": "Accounts Payable",
        "accesstoken": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..4vZSRbhdeKAzhR1cdNAldg.UlidsdNdZFkPCgtUHbcPt2ULfQLMjBzClMfT6lV_FedafWpErBk1hmNHcTvUbMH5uWXA6IC5DKKasEP4bvlIm_wScMg__rbldUIob-2ihjsDUD2rUncRk30MQ78hS0KEAj34f6b-KzLy3b9tZrB2VUIJPtbVPadzMArTvQjLtF7wTf055LoYh3d8qAjaZsh082oPtjVKevHdMs4C-DIZURwNu2gAAX_Bes-nlVxz3N4SFn9d1Lt2h-WQZmrbRHzahzN9QoHTvTr9FgsxMIo0NYQ8Hz9k8BvmB71qMF2W6ld9wZQDgaMy8k_oqbmarO4inouTOhjjXvSWwuI1I653Aqvm-ZauHlqSoNjVZljwnguEIheO3KD421f8pBlD58mQgDyAGySpiL6IXMB2DEj7ey_eyY1gLtkHgyG1_-f6G-83lzM_je4GD_o9g_wSuWxyCUrNEDVQozfmhlNDqQv6Pu4XrAfVloQ09j3Sdz5lyaKsuhc1I80y0bQxBY3PibNF0_cEKb0OyldCxij2eFIkSUbhzP5_seFpxamFrAuf8REgbZ8CbUqjKU-6t_HU-tEiAfEZqC0l8GqHY4qvWNpx_Lgw1Ja7J8S5YS7Mm4oX3t4xrALac1WyQv_CEU6JS2vHHztlw6rMEsfrFSj4QTH5GezT3zue6cTM1LpNJHpVO0ObRgwtrw_tUpRlAVHcYFA_ALZCs8ZJwPC6zO2vI36YAxJftX2JkQeg3OzGqrH1wQqFFn5t0m_omWaZ3HJMZsUN-m_9eGKLFpzeOQuO-ObxaobNlNfUffJl1o_76IzWzI1nt5cKIxNik3u38ruZgPS9bYbvk-xaXlLiqVvDP5Rp4Q.hNo28QLaCBXaut4-qPIpig",
        "realmId": "4620816365208479440"
    }
    
    const response = await main(body, null, null);
    const status_code = response.statusCode;

    expect(status_code).toBe(200);
});